import {Box, Center, Spinner} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface OverlayLoaderProps {
  children: ReactNode,
  isLoading: boolean
}

export const OverlayLoader: FC<OverlayLoaderProps> = ({
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
