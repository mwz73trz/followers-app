import "./App.css";
import { useState } from "react";

const App = () => {
  return <Followers />;
};

const Followers = () => {
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    if (!userList.some((user) => user.name === newUser)) {
      setUserList([
        ...userList,
        { name: newUser, followers: [], following: [] },
      ]);
      setNewUser("");
    } else alert("This user already exists");
  };

  const submitNewFollow = (e) => {
    e.preventDefault();
    const user1Index = userList.findIndex((user) => user.name === user1);
    const user2Index = userList.findIndex((user) => user.name === user2);

    if (user1 === user2) alert(user1 + " cannot follow themself.");
    else if (user1Index === -1) alert(user1 + " is not a user.");
    else if (user2Index === -1) alert(user2 + " is not a user.");
    else if (userList[user1Index].following.includes(user2))
      alert(user1 + " already follows " + user2);
    else {
      const newUser1Obj = { ...userList[user1Index] };
      const newUser2Obj = { ...userList[user2Index] };
      newUser1Obj.following = [...newUser1Obj.following, user2];
      newUser2Obj.followers = [...newUser2Obj.followers, user1];
      const shallowListCopy = [...userList];
      shallowListCopy[user1Index] = newUser1Obj;
      shallowListCopy[user2Index] = newUser2Obj;
      setUserList(shallowListCopy);
      setUser1("");
      setUser2("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <form onSubmit={createUser}>
        <input
          style={{ width: 200, margin: 30 }}
          value={newUser}
          required
          placeholder={"Enter new user"}
          onChange={(e) => setNewUser(e.target.value)}
        />
      </form>
      <h4>User List</h4>
      {userList.map((user) => (
        <div
          onClick={() => {
            alert(
              user.name +
                " has " +
                user.followers.length +
                " followers and is following " +
                user.following.length +
                " people."
            );
          }}
          style={{ cursor: "pointer" }}
        >
          {user.name}
        </div>
      ))}
      <form
        style={{ display: "flex", margin: 50, alignSelf: "center" }}
        onSubmit={submitNewFollow}
      >
        <input
          style={{ width: 100 }}
          value={user1}
          required
          onChange={(e) => setUser1(e.target.value)}
        />
        <div style={{ margin: "0px 10px 0px 10px" }}>will now follow</div>
        <input
          style={{ width: 100 }}
          value={user2}
          required
          onChange={(e) => setUser2(e.target.value)}
        />
        <input type={"submit"} />
      </form>
    </div>
  );
};

export default App;
