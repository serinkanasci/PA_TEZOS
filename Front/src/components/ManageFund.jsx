import { useState } from "react";
import { withdraw, deposit } from "../utils/wallet";

export default function ManageFund(props) {
  const [value, setDeposit] = useState("");
  const [value_to_recup, setWithdraw] = useState("");

  return (
    <div className="flex">

      <input
        type="text"
        name="value"
        onChange={(e) => {
          console.log(e.target.value)
          setDeposit(e.target.value);
        }}
        value={value}
      />
      <button
        onClick={() => {
          deposit(value);
        }}
        className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        Deposit
      </button>



      <input
        type="text"
        name="value_to_recup"
        onChange={(e) => {
          console.log(e.target.value)
          setWithdraw(e.target.value);
        }}
        value={value_to_recup}
      />
      <button
        onClick={() => {
          withdraw(value_to_recup);
        }}
        className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        Withdraw
      </button>
    </div>
  );
}
