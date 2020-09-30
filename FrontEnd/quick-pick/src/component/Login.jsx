import React from 'react';


function Login(){
    return (
            <div className="container text-center ">
					<div className="login" >
						<form >
							<h2 style={{ color: "#000000" }}>Login.....</h2>
							<div className="username">
								<input
									type="text"
									placeholder="Username..."
									name="emailID"
								/>
							</div>

							<div className="password">
								<input
									type="password"
									placeholder="Password..."
									name="password"
								/>
							</div>
							<div className="wrapper text-center">
								<input style={{ justifyContent: "center" }} type="submit" />
							</div>
						</form>

						<a href="/register">Create an account</a>
					</div>
                </div>
            )
        }

export default Login