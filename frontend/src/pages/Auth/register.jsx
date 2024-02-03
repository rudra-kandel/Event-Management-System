import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const Register = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <h2 className=" font-bold">Register</h2>

        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              type="name"
              placeholder="Rudra Kandel"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </>
  );
};

export default Register;
