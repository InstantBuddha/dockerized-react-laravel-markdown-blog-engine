import React from "react";

function ErrorMessage(props) {
    return (
        <div className="page-wrapper">
            <div className="error-card">
                <h1>Error</h1>
                <p>{props.errorMessageText}</p>
                <p>Error code: {props.errorCode}</p>
            </div>
        </div>
    );
}
export default ErrorMessage;
