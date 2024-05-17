import React, { useState } from "react";
import Aside from "../Aside";
import { Input, InputBase, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IMaskInput } from "react-imask";
import { Link } from "react-router-dom";
// import {Dayjs} from "dayjs"
// import customParseFormat from 'dayjs/plugin/customParseFormat ';

const AddNewClient = () => {
  const [valueFirst, setValueFirstName] = useState("");
  return (
    <div className="w-[80%]">
      <h2 className=" text-center text-3xl mb-2">Add New Client</h2>
      <form action="">
        <div className="flex gap-2 items-center justify-center">
          <label htmlFor="">Patient Name:</label>
        <div className=" flex gap-6">
          <TextInput
            label="First name"
            withAsterisk
            // value={value}
            // onChange={(event) => setValue(event.currentTarget.value)}
          />
          <TextInput label="Middle name" />

          <TextInput label="Last name" withAsterisk />

        </div>
        </div>
          <Select
            label="Gender"
            withAsterisk
            placeholder="Select your gender"
            data={["Male", "Female"]}
          />
        <InputBase
        label="Your phone"
        component={IMaskInput}
        mask="+233-00-000-0000"
        placeholder="Your phone"
        withAsterisk
      />
          <DateInput label="Date of Birth" withAsterisk placeholder="Select from calender" />
          <Select
            label="Marital Status"
            withAsterisk
            placeholder="Select your gender"
            data={["Never Married", "Married", "Widowed", "Divorced", "Legally Seperated", "Annulled", "Domestic partner", "Interlocutory", "Polygamious", "Single", "Child"]}
          />
        <TextInput label="Address" withAsterisk />
        <div className=" flex gap-[1rem] mt-[2rem]">
        <button className=" bg-black text-white font-bold p-2 pl-6 pr-6" type="submit">Save</button>
        <Link className=" bg-red-700 text-white font-bold p-2 pl-6 pr-6" to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default AddNewClient;
