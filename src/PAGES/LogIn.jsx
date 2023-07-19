import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./Login.module.css"
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";


function LogIn() {
    const [memberNo, setMemberNo] = useState("")
    const [password, setPassword] = useState("")
    const [alertMessage, setAlertMessage] = useState('');
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
    const navigate = useNavigate();

    //Refresh token: Cookie 저장, Access token: Read-Only cookie 필요시마다 호출해서 사용
    const submit = () => {
        if (!memberNo || !password) {
            setAlertMessage("사번 또는 비밀번호를 입력하세요.");
            setIsShowAlert(true);
        } else {
            axios.post("http://172.20.10.26:9091/auth/login", {
                "no": memberNo,
                "password": password
            })
                .then((res) => {
                    console.log(res.data);
                    const accessToken = res.data.accessToken;
                    setCookie("loginCookie", accessToken);
                    axios.defaults.headers["Authorization"]=`Bearer ${accessToken}`;
                    console.log("Authorization Header:", axios.defaults.headers["Authorization"]);
                    navigate("/main");
                })
                .catch((error) =>{
                    setAlertMessage("입력하신 값이 올바르지 않습니다.");
                    setIsShowAlert(true);
                    console.log("Error Login:", error);
                })
        }
    }

    useEffect(() => {
        let timeout;
        if (isShowAlert) {
            timeout = setTimeout(() => {
                setIsShowAlert(false);
            }, 1500);
        }
        return () => clearTimeout(timeout);
    }, [isShowAlert]);

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {isShowAlert && (
                    <div>
                        <Alert variant="danger" className={styles.alert}>
                            {alertMessage}
                        </Alert>
                    </div>
                )}
                <div className={styles.loginContainer}>
                    <div className={styles.title}>ACCOUNT LOGIN</div>
                    <div className={styles.inputWrap}>
                        <div>
                           <input type="text" className="form-control" id="email"
                                  placeholder="사번"
                                  value={memberNo}
                                  onChange={(e)=>{setMemberNo(e.currentTarget.value)}}
                        />
                        </div>
                        <div>
                           <input type="password" className={`form-control ${styles.m10}`} id="password"
                                  placeholder="비밀번호"
                                  value={password}
                                  onChange={(e)=>{setPassword(e.currentTarget.value)}}
                        />
                        </div>
                        <button type="submit" className={`${styles.button} btn btn-primary`} id="send"
                                onClick={() => {submit()}}
                        >로그인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn