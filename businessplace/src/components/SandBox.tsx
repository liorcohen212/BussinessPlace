import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import User from "../interfaces/User";
import { deleteUser, getUser} from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { Link, useNavigate} from "react-router-dom";

interface SandBoxProps {
    userInfo: any;
}

const SandBox: FunctionComponent<SandBoxProps> = ({userInfo}) => {
    let theme = useContext(SiteTheme)
    let navigate = useNavigate()
    let [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getUser()
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err))
    }, []);
    let handleDelete = (id:Number) => {
        if(window.confirm("Are you sure?")) {
            deleteUser(id)
            .then((res) => {
                navigate("/sandbox")
                successMsg("User deleted successfully!");
            })
            .catch((err) => {console.log(err)
            errorMsg("action declined")
            });
        }
    };
    return (<>
    <div style={{color: theme.color, background: theme.background}}>
        <h1>SandBox</h1>
        <div className="container" style={{paddingBottom: 15}}>
        <table className="table">
<thead>
    <tr>
    <th scope="col" style={{background: theme.cardBg, color: theme.color}}>id</th>
    <th scope="col" style={{background: theme.cardBg, color: theme.color}}>name</th>
    <th scope="col" style={{background: theme.cardBg, color: theme.color}}>role<br></br>
    (click to change user)</th>
    <th scope="col" style={{background: theme.cardBg, color: theme.color}}>actions</th>
    </tr>
</thead>
<tbody>
    {users.length ? (<>
        {users.map((user: User) => (
    <tr>
    <td style={{background: theme.cardBg, color: theme.color}}>{user.id}</td>
    <td style={{background: theme.cardBg, color: theme.color}}>{user.firstname} {user.lastname}</td>
    <td style={{background: theme.cardBg, color: theme.color}}>
    {user.role === "isAdmin" ? (<>{user.role}</>) : (<>
    <Link to={`/updateUser/${user.id}`} style={{color: theme.color}}>{user.role}</Link>
    </>)}
    </td>
    <td style={{background: theme.cardBg, color: theme.color}}>
    {user.role === "isAdmin" ? (<><p></p></>
    ) : (
    <><Link to="" className="btn btn-danger" onClick={() => handleDelete(user.id as Number)}><i className="fa-solid fa-trash"></i></Link></>)}
    </td>
    </tr>
        ))}
    </>) : (<p>No users yet</p>)}
    </tbody>
    </table>
    </div>
        </div>
        </>
    );
}

export default SandBox;