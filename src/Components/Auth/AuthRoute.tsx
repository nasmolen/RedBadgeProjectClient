export {} 
//import { RouteComponentProps } from 'react-router-dom';

// interface Props {
// 	Component: React.FC<RouteComponentProps>
// 	path: string;
// 	exact?: boolean;
// };

// const AuthRoute = ({ Component, path, exact = false }: Props): JSX.Element => {
// 	const isAuthed = !!localStorage.getItem(ACCESS_TOKEN);
// 	const message = 'Please log in to view this page'
// 	return (
// 		<Route
// 			exact={exact}
// 			path={path}
// 			render={(props: RouteComponentProps) =>
// 				isAuthed ? (
// 					<Component {...props} />
// 				) : (
// 					<Redirect
// 						to={{
// 							pathname: NonAuthRoutes.login,
// 							state: { 
// 								message, 
// 								requestedPath: path
// 							}
// 						}}
// 					/>
// 				)
// 			}
// 		/>
// 	);
// };