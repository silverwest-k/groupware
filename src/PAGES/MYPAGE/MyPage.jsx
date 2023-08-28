import {useRef, useState} from "react";
import useStore from "../../store";
import {Button} from "react-bootstrap";
import fetcher from "../../fetcher";
import {MY_INFO_CHANGE_API} from "../../constants/api_constans";
import Swal from "sweetalert2";
import styled from "styled-components";
import {
    Container,
    Contents,
    ProfileImg,
    ProfileImgLabel,
    SubmitButton,
    Table,
    Upper,
    Wrapper
} from "../ACCOUNT-MNG/AccountManagement";

function MyPage() {
    const [password, setPassword] = useState("");
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const {myAccount} = useStore(state => state);

    const resetInput = () => {
        setPassword("")
    }

    const editInfo = () => {
        const form = new FormData
        fetcher.post(MY_INFO_CHANGE_API, {
            // team: imgFile ? imgFile :null,
            newPassword: password ? password : null,
        })
        // fetcher.postForm(MY_INFO_CHANGE_API, form, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // TODO: 이미지 수정 기능 구현
        fetcher.post(MY_INFO_CHANGE_API, {
            newPassword: password
        })
            .then(() => {
                resetInput()
                Swal.fire({
                    position: 'mid',
                    icon: 'success',
                    title: '수정 완료',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImgFile(reader.result);
        }
    }

    return (
        <Wrapper>
            <UserContainer>
                <Upper>
                    <p>마이페이지</p>
                </Upper>

                <Contents>
                    <UserTable>
                        <tbody>
                        <tr>
                            <th></th>
                            <UserProfileImg>
                                <img src={imgFile ? imgFile : require("../../IMAGES/profile.jpg")}
                                            alt="프로필 이미지"
                                />
                                <UserProfileImgLabel htmlFor="profileImg">이미지 업로드</UserProfileImgLabel>
                                <input
                                    style={{display: "none"}}
                                    type="file"
                                    accept="image/*"
                                    id="profileImg"
                                    onChange={saveImgFile}
                                    ref={imgRef}
                                />
                            </UserProfileImg>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>{myAccount.name}</td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input value={password}
                                       type="password"
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사번</th>
                            <td>{myAccount.no}</td>
                        </tr>
                        <tr>
                            <th>부서</th>
                            <td>{myAccount.team}</td>
                        </tr>
                        <tr>
                            <th>직급</th>
                            <td>{myAccount.position}</td>
                        </tr>
                        </tbody>
                    </UserTable>
                </Contents>
                <SubmitButton>
                    <Button className="button"
                            onClick={editInfo}
                    >수정</Button>
                </SubmitButton>
            </UserContainer>
        </Wrapper>
    )
}
export default MyPage

const UserContainer = styled(Container)`
  color: #4429f2;
  background: rgba(125, 121, 242, 0.05);
  border: solid 1px rgba(68, 41, 242, 0.4);
`
const UserProfileImg = styled(ProfileImg)`
  img {
    border:solid 3px rgba(68, 41, 242, 0.4);
  }
`
const UserProfileImgLabel = styled(ProfileImgLabel)`
  background: #4429f2;
`
const UserTable = styled(Table)`
  th {color: #4429f2;}
`