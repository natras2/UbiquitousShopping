import { useNavigate } from "react-router";

function Profile() {
    const navigator = useNavigate();

    const handleLogout = () => {
        navigator('..');
    }

    return (
        <div id="profile">
            <div className="btn btn-block btn-lg w-100 btn-secondary" onClick={() => handleLogout()}>Logout</div>
        </div>
    );
}

export default Profile;