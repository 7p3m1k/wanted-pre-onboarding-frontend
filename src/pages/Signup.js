import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPwMessage, setErrorPwMessage] = useState("");

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (email.match(emailRegEx) && pwRegEx.test(password)) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [email, password]);

  const emailRegEx = /@/gi;
  const pwRegEx = /^.{8,}$/;

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    e.target.value.match(emailRegEx)
      ? setErrorEmailMessage("이메일 조건 성립")
      : setErrorEmailMessage("이메일 조건: @ 포함");
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    pwRegEx.test(e.target.value)
      ? setErrorPwMessage("비밀번호 조건 성립")
      : setErrorPwMessage("비밀번호 조건: 8자 이상");
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios
          .post(
            "https://www.pre-onboarding-selection-task.shop/auth/signup",
            {
              email: email,
              password: password,
            },
            {
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            alert("회원가입 성공");
            navigate("/signin");
          });
      } catch (err) {
        alert(err.response.data.message);
      }
    },
    [email, password, navigate]
  );

  return (
    <div className="login">
      <div className="login-wrapper">
        <form onSubmit={onSubmit}>
          <input
            data-testid="email-input"
            placeholder="Email"
            value={email}
            onChange={onChangeEmail}
          />
          {email && <div className="errorMessage">{errorEmailMessage}</div>}
          <input
            data-testid="password-input"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          {password && <div className="errorMessage">{errorPwMessage}</div>}
          <button data-testid="signup-button" type="submit" disabled={checked}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
