// mostly took this from the react-docs
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
   state = { hasError: false, redirect: false };

   static getDerivedStateFromError() {
      return { hasError: true };
   }

   componentDidCatch(error, info) {
      // log to Azure Monitor, New Relic, TrackJS
      console.error("Error Boundary caught an error", error, info);
   }

   componentDidUpdate() {
      if (this.state.hasError) {
         setTimeout(() => this.setState({ redirect: true }), 5000);
      }
   }

   render() {
      if (this.state.redirect) {
         return <Redirect to="/" />;
      }

      if (this.state.hasError) {
         return (
            <h2>
               This listing has an error. <Link to="/">Click here</Link> to go
               back to the home page or wait 5 seconds.
            </h2>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
