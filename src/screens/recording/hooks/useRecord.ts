import {useState, useEffect, useRef, useCallback} from 'react';
// import Voice from '@react-native-voice/voice';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Platform, PermissionsAndroid} from 'react-native';
import {useDirectoryListQuery} from './useRecordQuery';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
/**
 * 녹음 기능 관련 훅입니다.
 * @author 홍규진
 * @returns 녹음 상태, 음성 인식 텍스트, 타이머, 녹음 경로
 */

export type RecordError = {
  message: string;
  type: 'permission' | 'initialization' | 'recording' | 'stt';
};

export function useRecord() {
  const [workspace] = useAtom(workspaceState);
  const {data: directoryList} = useDirectoryListQuery(workspace.workspaceId);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<RecordError | null>(null);
  const [waveform, setWaveform] = useState<number[]>([]);
  const audioRecorderPlayerRef = useRef<AudioRecorderPlayer | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // 권한 체크 및 요청
  const checkAndRequestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: '마이크 권한',
            message: '녹음을 위해 마이크 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '취소',
            buttonPositive: '확인',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.error('[useRecord] 권한 요청 실패:', err);
      return false;
    }
  };

  // AudioRecorderPlayer 초기화
  useEffect(() => {
    let mounted = true;

    const initRecorder = async () => {
      try {
        console.log(
          '[useRecord] 초기화 시작, 현재 인스턴스:',
          audioRecorderPlayerRef.current,
        );

        // 권한 체크
        const hasPermission = await checkAndRequestPermission();
        if (!hasPermission) {
          throw new Error('마이크 권한이 없습니다.');
        }

        // 인스턴스가 없으면 생성
        if (!audioRecorderPlayerRef.current) {
          console.log('[useRecord] 인스턴스 생성 시도');
          audioRecorderPlayerRef.current = new AudioRecorderPlayer();
          console.log('[useRecord] AudioRecorderPlayer 인스턴스 생성 완료');
        }

        if (mounted) {
          setIsReady(true);
          setError(null);
          console.log('[useRecord] AudioRecorderPlayer 초기화 완료');
        }
      } catch (err) {
        console.error('[useRecord] AudioRecorderPlayer 초기화 실패:', err);
        if (mounted) {
          setError({
            message:
              err instanceof Error
                ? err.message
                : '녹음 기능 초기화에 실패했습니다.',
            type: 'permission',
          });
        }
      }
    };

    initRecorder();

    return () => {
      mounted = false;
    };
  }, []);

  // 녹음 종료 시 처리
  useEffect(() => {
    return () => {
      const cleanup = async () => {
        try {
          if (isRecording && audioRecorderPlayerRef.current) {
            await audioRecorderPlayerRef.current.stopRecorder();
            // await Voice.stop();
          }
          audioRecorderPlayerRef.current?.removeRecordBackListener();
        } catch (err) {
          console.error('[useRecord] cleanup 실패:', err);
        }
      };
      cleanup();
    };
  }, [isRecording]);

  // 타이머
  useEffect(() => {
    let animationFrameId: number;
    let lastUpdateTime = Date.now();

    const updateTimer = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;
      const newTimer = Math.floor(elapsedTime / 10);

      // 100ms마다 한 번씩만 업데이트
      if (currentTime - lastUpdateTime >= 100) {
        setTimer(newTimer);
        lastUpdateTime = currentTime;
      }

      if (isRecording && !isPaused) {
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (isRecording && !isPaused) {
      startTimeRef.current = Date.now() - timer * 10;
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRecording, isPaused, timer]);

  // 오디오 시각화 (pause 시에는 파형 멈춤)
  useEffect(() => {
    let recordBackListener: any;
    if (isRecording && !isPaused && audioRecorderPlayerRef.current) {
      recordBackListener = audioRecorderPlayerRef.current.addRecordBackListener(
        e => {
          const amplitude = e.currentMetering ?? 0;
          setWaveform(prev => [...prev.slice(-49), amplitude]);
        },
      );
    }
    return () => {
      if (audioRecorderPlayerRef.current && recordBackListener) {
        audioRecorderPlayerRef.current.removeRecordBackListener();
      }
    };
  }, [isRecording, isPaused]);

  // 녹음 시작
  const startRecording = useCallback(async () => {
    if (!isReady || !audioRecorderPlayerRef.current) {
      setError({
        message: '녹음 기능이 아직 준비되지 않았습니다.',
        type: 'initialization',
      });
      return;
    }
    try {
      setTimer(0);
      setError(null);
      setIsPaused(false);
      const path = await audioRecorderPlayerRef.current.startRecorder();
      setAudioPath(path);
      setIsRecording(true);
    } catch (err) {
      setError({
        message: '녹음 시작 중 오류가 발생했습니다.',
        type: 'recording',
      });
    }
  }, [isReady]);

  // 녹음 일시정지
  const pauseRecording = useCallback(async () => {
    if (!isRecording || isPaused || !audioRecorderPlayerRef.current) {
      return;
    }
    try {
      await audioRecorderPlayerRef.current.pauseRecorder();
      setIsPaused(true);
    } catch (err) {
      setError({
        message: '일시정지 중 오류가 발생했습니다.',
        type: 'recording',
      });
    }
  }, [isRecording, isPaused]);

  // 녹음 재개
  const resumeRecording = useCallback(async () => {
    if (!isRecording || !isPaused || !audioRecorderPlayerRef.current) {
      return;
    }
    try {
      await audioRecorderPlayerRef.current.resumeRecorder();
      setIsPaused(false);
    } catch (err) {
      setError({
        message: '재개 중 오류가 발생했습니다.',
        type: 'recording',
      });
    }
  }, [isRecording, isPaused]);

  // 녹음 정지 후 저장 path 반환
  const stopRecording = useCallback(async () => {
    if (!isRecording || !audioRecorderPlayerRef.current) {
      return;
    }
    setIsRecording(false);
    setIsPaused(false);

    const path = await audioRecorderPlayerRef.current.stopRecorder();
    setAudioPath(path);
    return path;
  }, [isRecording]);

  // 기존 handleMicPress는 startRecording만 담당하도록 변경
  const handleMicPress = startRecording;

  return {
    isRecording,
    isPaused,
    timer,
    handleMicPress,
    pauseRecording,
    resumeRecording,
    stopRecording,
    audioPath,
    isReady,
    error,
    waveform,
    directoryList,
  };
}
