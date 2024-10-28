// import { toHaveValue } from "@testing-library/jest-dom/matchers";
import "./index.css";
import "./index2.css";
import React, { useState } from "react";

function App() {
  // State to keep track of the active tab
  const [friends, setfriends] = useState(initialFriends);
  const [showAddfriend, setShowAddfriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddfriend() {
    setShowAddfriend((show) => !show);
  }
  function handleAddfriend(addnew) {
    setfriends((friends) => [...friends, addnew]);
    setShowAddfriend(false);
  }
  function selecthandeler(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddfriend(false);
  }
  function handlesplitBill(value) {
    setfriends((ashik) =>
      ashik.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div>
      <Navbars />
      <Tipcalculator />
      <div className="app">
        <div className="sidebar">
          <Friendlist
            newFriendAdd={friends}
            selectNewPaymenFtriend={selectedFriend}
            onSelections={selecthandeler}
          />

          {showAddfriend && <FormAddFriend onAddFriend={handleAddfriend} />}
          <Button onClicks={handleShowAddfriend}>
            {showAddfriend ? "Close" : "Add friend"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            verySelected={selectedFriend}
            onSplitbill={handlesplitBill}
          />
        )}
      </div>
    </div>
  );
}
function Navbars() {
  const [activeTab, setActiveTab] = useState("Home");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav>
      <ul className="nav-list">
        <li
          className={activeTab === "Home" ? "active" : ""}
          onClick={() => handleTabClick("Home")}
        >
          Home
        </li>
        <li
          className={activeTab === "About" ? "active" : ""}
          onClick={() => handleTabClick("About")}
        >
          About
        </li>
        <li
          className={activeTab === "Services" ? "active" : ""}
          onClick={() => handleTabClick("Services")}
        >
          Services
        </li>
        <li
          className={activeTab === "Contact" ? "active" : ""}
          onClick={() => handleTabClick("Contact")}
        >
          Contact
        </li>
      </ul>
    </nav>
  );
}

export default App;
// challenge 7no section 17 video
//
//
//
function Tipcalculator() {
  const [bill, setbill] = useState("");
  const [percentage1, setpercentage1] = useState(0);
  const [percentage2, setpercentage2] = useState(0);
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);
  function handleReset() {
    setbill("");
    setpercentage1(0);
    setpercentage2(0);
  }

  return (
    <div>
      <Billinput bill={bill} onsetbill={setbill} />
      <Selectpercentage percentage={percentage1} onSelect={setpercentage1}>
        How did you like the service ?
      </Selectpercentage>
      <Selectpercentage percentage={percentage2} onSelect={setpercentage2}>
        How did your friend like this service ?
      </Selectpercentage>
      <Output bill={bill} tip={tip} />
      <Reset onreset={handleReset} />
    </div>
  );
}
function Billinput({ bill, onsetbill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onsetbill(Number(e.target.value))}
      />
    </div>
  );
}
function Selectpercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="15">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}
function Output({ bill, tip }) {
  return (
    <h3>
      you pay ${bill + tip} (${bill}+${tip} tip)
    </h3>
  );
}
function Reset({ onreset }) {
  return <button onClick={onreset}>Reset</button>;
}
// 8no section practice
//
//
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Friendlist({ newFriendAdd, onSelections, selectNewPaymenFtriend }) {
  return (
    <ul>
      {newFriendAdd.map((e) => (
        <Friend
          dasa={e}
          key={e.id}
          paymentnew={selectNewPaymenFtriend}
          onselecteded={onSelections}
        />
      ))}
    </ul>
  );
}
function Friend({ dasa, onselecteded, paymentnew }) {
  const isSelected = paymentnew?.id === dasa.id;
  return (
    <li>
      <img src={dasa.image} alt={dasa.name} />
      <h3>{dasa.name}</h3>
      {dasa.balance < 0 && (
        <p className="red">
          You owe {dasa.name} {Math.abs(dasa.balance)}
        </p>
      )}
      {dasa.balance > 0 && (
        <p className="green">You and {dasa.balance} are even</p>
      )}
      {dasa.balance === 0 && <p className="">You and {dasa.name} are even</p>}
      <Button onClicks={() => onselecteded(dasa)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
function Button({ children, onClicks }) {
  return (
    <button className="button" onClick={onClicks}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setname] = useState("");
  const [image, setimage] = useState("https://i.pravatar.cc/48?");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setname("");
    setimage("https://i.pravatar.cc/48?");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👩🏻‍🤝‍🧑🏽Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setimage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ verySelected, onSplitbill }) {
  const [bill, setbill] = useState("");
  const [paidByuser, setpaidByuser] = useState("");
  const [whoisPaying, setWhoispaying] = useState("user");
  const paidByFriend = bill ? bill - paidByuser : "";
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByuser) return;
    onSplitbill(whoisPaying === "user" ? paidByFriend : -paidByuser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> Split a bill with {verySelected.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      />
      <label>🧍‍♂️Your expense</label>
      <input
        type="text"
        value={paidByuser}
        onChange={(e) =>
          setpaidByuser(
            Number(e.target.value) > bill ? paidByuser : Number(e.target.value)
          )
        }
      />
      <label>
        👩🏻‍🤝‍🧑🏽
        {verySelected.name} s expense
      </label>
      <input type="text" disabled value={paidByFriend} />
      <label>😊Who paying the bill</label>
      <select
        value={whoisPaying}
        onChange={(e) => setWhoispaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{verySelected.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
