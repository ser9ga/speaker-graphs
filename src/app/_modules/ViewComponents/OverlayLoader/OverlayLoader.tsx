import {Box, Center, Spinner} from "@chakra-ui/react";

export const OverlayLoader = ({
  children,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Box pos="absolute" inset="0" bg="bg/80">
        <Center h="full">
          <Spinner color="teal.500" />
        </Center>
      </Box>
    );
  }
  return children
}
