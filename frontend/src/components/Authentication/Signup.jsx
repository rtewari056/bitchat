import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleUploadPicture = (e) => {};

  const submitHandler = (e) => {};

  return (
    <Stack spacing="6">
      <Stack spacing="5">
        <FormControl isRequired id="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="name"
            placeholder="Enter Your Name"
            onChange={(e) => handleCredentials(e)}
          />
        </FormControl>
      </Stack>

      <Stack spacing="5">
        <FormControl isRequired id="email">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => handleCredentials(e)}
          />
        </FormControl>
      </Stack>

      <Stack spacing="5">
        <FormControl isRequired id="password">
          <FormLabel htmlFor="password">password</FormLabel>
          <InputGroup>
            <InputRightElement w="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            <Input
              type={show ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => handleCredentials(e)}
            />
          </InputGroup>
        </FormControl>
      </Stack>

      <Stack spacing="5">
        <FormControl isRequired id="confirmPassword">
          <FormLabel htmlFor="password">Confirm Password</FormLabel>
          <InputGroup>
            <InputRightElement w="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => handleCredentials(e)}
            />
          </InputGroup>
        </FormControl>
      </Stack>

      <Stack spacing="5">
        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => handleUploadPicture(e)}
          />
        </FormControl>
      </Stack>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => submitHandler}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default Signup;
