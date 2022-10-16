import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

const FileUpload = () => {
  return (
    <FormControl>
      <FormLabel>Upload your Picture</FormLabel>

      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <i class="fas fa-folder-open" />
        </InputLeftElement>

        <Input
          type="file"
          id="fileupload"
          isInvalid={true}
          errorBorderColor="#eaafc8"
          sx={{
            "::file-selector-button": {
              height: 10,
              padding: 0,
              mr: 4,
              background: "none",
              border: "none",
              fontWeight: "bold",
            },
          }}
        />
      </InputGroup>

      <FormHelperText>
        <i class="fas fa-paperclip" /> Attach your profile picture.
      </FormHelperText>
    </FormControl>
  );
};

export default FileUpload;
