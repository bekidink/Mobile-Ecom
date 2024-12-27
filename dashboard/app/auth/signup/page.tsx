"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});
import { handleLogin, handleSignup } from "@/actions/login";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
   handleSignup(email, password);
  }
  return (
    // <Box className="flex-1 min-h-screen justify-center items-center">
    //   <FormControl
    //     isInvalid={!!errorMessage}
    //     className="p-4 border rounded-lg max-w-[500px] w-full border-outline-300 bg-white m-2"
    //   >
    //     <VStack space="xl">
    //       <Heading className="text-typography-900 leading-3 pt-3">
    //         Login
    //       </Heading>
    //       <VStack space="xs">
    //         <Text className="text-typography-500 leading-1">Email</Text>
    //         <Input>
    //           <InputField value={email} onChangeText={setEmail} type="text" />
    //         </Input>
    //       </VStack>
    //       <VStack space="xs">
    //         <Text className="text-typography-500 leading-1">Password</Text>
    //         <Input className="text-center">
    //           <InputField
    //             value={password}
    //             onChangeText={setPassword}
    //             type="password"
    //           />
    //         </Input>
    //       </VStack>
    //       {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
    //       <HStack space="sm">
    //         <Button
    //           className="flex-1"
    //           variant="outline"
    //           onPress={() => handleSignup(email, password)}
    //         >
    //           <ButtonText>Sign up</ButtonText>
    //         </Button>
    //         <Button
    //           className="flex-1"
    //           onPress={() => handleLogin(email, password)}
    //         >
    //           <ButtonText>Sign in</ButtonText>
    //         </Button>
    //       </HStack>
    //     </VStack>
    //   </FormControl>
    // </Box>
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Card className="w-[410px]">
        <CardHeader>
          <CardTitle className="text-typography-900 text-center leading-3 pt-3">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="****" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Label>Already have account?</Label>
          <Button>
            <Link href={"/auth"}>Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
