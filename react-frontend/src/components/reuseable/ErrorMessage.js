import React from "react";

function ErrorMessage(props) {
    return (
        <div className="error-card">
            <h1>Error</h1>
            <p>{props.errorMessageText}</p>
            <p>Error code: {props.errorCode}</p>
        </div>
    );
}
export default ErrorMessage;
