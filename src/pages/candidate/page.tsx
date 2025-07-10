import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PROVIOTECH from "../../assets/proviotech.png";
import { Toaster, toast } from "sonner";

export default function CandidateForm() {
  const [formData, setFormData] = useState({
    position: "",
    full_name: "",
    phone_number: "",
    city: "karachi",
    interview_date: new Date().toISOString().split("T")[0],
    address: "",
    email: "",
    currentSalary: "",
    desiredSalary: "",
    expectedDate: "",
    companyName: "",
    positionHeld: "",
    status: "pending",
    interviewer : ""
  });

  const [positionError, setPositionError] = useState(false);

  const [nameError, setNameError] = useState(false);

  const [phoneError, setPhoneError] = useState(false);

  const [emailError, setEmailError] = useState(false);

  const [addressError, setAddressError] = useState(false);

  const checkName = (e: any) => {
    if (e.target.value.length < 3 && e.target.value != "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setFormData({ ...formData, full_name: e.target.value });
  };

  const checkEmail = (e: any) => {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(e.target.value) && e.target.value != "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setFormData({ ...formData, email: e.target.value });
  };

  const phoneCheck = (e: any) => {
    let regex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;

    if (!regex.test(e.target.value) && e.target.value != "") {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    setFormData({ ...formData, phone_number: e.target.value });
  };

  const handleSelectChange = (value: any) => {
    if (value == "") {
      setPositionError(true);
    } else {
      setPositionError(false);
    }
    setFormData({ ...formData, position: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.position == "") {
      setPositionError(true);
    } else {
      setPositionError(false);
    }
    if (!nameError && !emailError && !phoneError && !positionError) {
      try {
        let res = await fetch("http://localhost:3333/api/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        });
        let mess = await res.json();
        toast("✔ Form Submit Successfully");
        setFormData({
          position: "",
          full_name: "",
          phone_number: "",
          city: "karachi",
          interview_date: new Date().toISOString().split("T")[0],
          address: "",
          email: "",
          currentSalary: "",
          desiredSalary: "",
          expectedDate: "",
          companyName: "",
          positionHeld: "",
          status: "pending",
          interviewer: ""
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster></Toaster>
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
        <CardHeader className="text-center border-b">
          <img
            src={PROVIOTECH}
            alt="Proviotech Logo"
            width={300}
            className=" mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">
            Candidate Application Form
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Position */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2">Position Applied For</Label>
                <Select value={formData.position} onValueChange={handleSelectChange}>
                  <SelectTrigger
                    className={`w-full ${
                      positionError ? `border-red-400` : ``
                    }`}
                  >
                    <SelectValue defaultValue="" placeholder="Pick a position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="graphic-designer">
                      Graphic Designer
                    </SelectItem>
                    <SelectItem value="website-developer">
                      Website Developer
                    </SelectItem>
                  </SelectContent>
                </Select>
                {positionError ? (
                  <div className="text-sm text-red-400 m-2">Select value</div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <Label className="mb-2">Interview Date</Label>
                <Input type="text" disabled value={formData.interview_date} />
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2">Full Name</Label>
                  <Input
                    name="full_name"
                    placeholder="Enter your name"
                    value={formData.full_name}
                    className={
                      nameError
                        ? "border  focus:!border-red-400 border-red-400"
                        : ""
                    }
                    onChange={(e) => {
                      checkName(e);
                    }}
                    required
                  />
                  {nameError ? (
                    <div className="text-sm text-red-400 m-2">
                      enter your name
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <Label className="mb-2">Phone Number</Label>
                  <Input
                    value={formData.phone_number}
                    name="phone"
                    type="number"
                    className={
                      phoneError
                        ? "border focus:!border-red-400 border-red-400"
                        : ""
                    }
                    placeholder="Enter your phone"
                    onChange={(e) => {
                      phoneCheck(e);
                    }}
                    required
                  />
                  {phoneError ? (
                    <div className="text-sm text-red-400 m-2">
                      enter valid number
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <Label className="mb-2">Address</Label>
                  <Input
                    value={formData.address}
                    name="address"
                    placeholder="Enter your address"
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                    }}
                    required
                  />
                </div>
                <div>
                  <Label className="mb-2">City</Label>
                  <Input value="Karachi" disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2">Email Address</Label>
                  <Input
                    value={formData.email}
                    name="email"
                    type="email"
                    className={
                      emailError
                        ? "border focus:!border-red-400 border-red-400"
                        : ""
                    }
                    placeholder="Enter your email"
                    onChange={(e) => {
                      checkEmail(e);
                    }}
                    required
                  />
                  {emailError ? (
                    <div className="text-sm text-red-400 m-2">
                      enter valid email
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/* Employment Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Employment Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2">Current Salary</Label>
                  <Input
                    value={formData.currentSalary}
                    name="currentSalary"
                    placeholder="Enter your current salary"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        currentSalary: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label className="mb-2">Desired Salary</Label>
                  <Input
                    value={formData.desiredSalary}
                    name="desiredSalary"
                    placeholder="Enter your desired salary"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        desiredSalary: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2">Expected Date of Joining</Label>
                  <Input
                    value={formData.expectedDate}
                    name="expectedDate"
                    type="date"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        expectedDate: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Employment */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Most Recent Employment
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2">Company Name</Label>
                  <Input
                    value={formData.companyName}
                    name="companyName"
                    placeholder="Enter your company name"
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <Label className="mb-2">Position Held</Label>
                  <Input
                    value={formData.positionHeld}
                    name="positionHeld"
                    placeholder="Enter your position held"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        positionHeld: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Declaration */}
            <p className="text-sm text-center">
              I certify that the information provided in this application is
              true and complete to the best of my knowledge.
            </p>

            <div className="flex justify-center">
              <Button type="submit" className="w-full md:w-1/3">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
