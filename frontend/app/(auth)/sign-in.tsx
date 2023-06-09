import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  NativeBaseProvider,
  Avatar,
  Button,
  Icon,
  Input,
  Text,
  Box,
  Heading,
  FormControl,
  Center,
  VStack,
  HStack,
  KeyboardAvoidingView,
} from "native-base";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BackendAPI from "../../constants/BackendAPI";
import { useAuth } from "../../context/auth";
import { Platform } from "react-native";

type FormData = {
  email: string;
  password: string;
};

function Copyright(props: any) {
  return (
    <Text alignItems="center" mt={8} mb={4}>
      {"Copyright © "}
      <Link href="https://nativebase.io">Your Website</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
}

export default function SignIn() {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("authContext not found");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await fetch(BackendAPI.signIn, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.access_token && result.user_id)
      authContext.signIn(`${result.access_token}`, `${result.user_id}`);
    reset();
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center>
          <Box
            w="90%"
            maxW="290"
            mt={40}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Avatar>
              <Icon
                textAlign="center"
                as={<FontAwesome name="lock" />}
                size={5}
              />
            </Avatar>
            <Heading size="md">Sign in</Heading>
            <VStack space={3} mt="5" w="100%">
              <FormControl isRequired isInvalid={"email" in errors}>
                <FormControl.Label>Email ID</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      onBlur={field.onBlur}
                      onChangeText={(val) => field.onChange(val)}
                      value={field.value}
                    />
                  )}
                  name="email"
                  rules={{
                    required: "Field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid Email Address",
                    },
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors.email?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={"password" in errors}>
                <FormControl.Label>Password</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="password"
                      onBlur={field.onBlur}
                      onChangeText={(val) => field.onChange(val)}
                      value={field.value}
                      type="password"
                    />
                  )}
                  name="password"
                  rules={{
                    required: "Field is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors.password?.message}
                </FormControl.ErrorMessage>
                <Text
                  fontSize="xs"
                  fontWeight="500"
                  color="indigo.500"
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Text>
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={handleSubmit(onSubmit)}
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link href="sign-up">
                  <Text color="indigo.500" fontWeight="medium" fontSize="sm">
                    Sign Up
                  </Text>
                </Link>
              </HStack>
            </VStack>
          </Box>
          <Copyright />
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
