import { Navigate } from "react-router"

const NoMatch = (props) => {
    return <Navigate to={'/404'} state={{ noMatch: true}} />
}

// const ProviderHOC = (NotFoundRoute) => {
//     const RouteProvider = (props) => {
//         if(props.location && props.location.state && props.location.noMatch) {
//            return  <NotFoundRoute {...props} />
//         }
//         return props.children;
//     }
//     return withRouter(RouteProvider)

// }

export { NoMatch };