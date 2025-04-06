// import React from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import AppNavigator from '@/navigation/navigator';
// import {AuthProvider} from '@/contexts/auth/AuthContext';
// import {QueryClientProvider} from '@/contexts/query/QueryContext';
// import {ThemeProvider} from '@/contexts/theme/ThemeContext';
// import {ModalProvider} from '@/contexts/modal/ModalContext';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import BottomSheetProvider from '@contexts/bottomSheet/BottomSheetContext';

// function App(): React.JSX.Element {
//   return (
//     <SafeAreaProvider>
//       <QueryClientProvider>
//         <AuthProvider>
//           <ThemeProvider>
//             <ModalProvider>
//               <GestureHandlerRootView style={{flex: 1}}>
//                 <BottomSheetProvider>
//                   <AppNavigator />
//                 </BottomSheetProvider>
//               </GestureHandlerRootView>
//             </ModalProvider>
//           </ThemeProvider>
//         </AuthProvider>
//       </QueryClientProvider>
//     </SafeAreaProvider>
//   );
// }

// export default App;

export {default} from './.storybook';
