import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/AuthLayout";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const fileTypes = ["image/png", "image/jpeg"]; // defining accepting file types

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .max(12, "Password can't be more than 12 characters")
      .min(6, "Password can't be less than 6 characters"),
    confirm_password: z
      .string()
      .max(12, "Password can't be more than 12 characters")
      .min(6, "Password can't be less than 6 characters"),
    name: z.object({
      firstName: z.string().min(3),
      lastName: z.string().min(2),
    }),
    bio: z.string().optional(),
    photo: z
      .instanceof(FileList)
      .optional()
      .refine((files) => files?.length === 1, {
        message: "Please upload exactly one file",
      })
      .refine(
        (files) =>
          files instanceof FileList && fileTypes.includes(files[0].type),
        {
          message: "Please add png or jpg files.",
        }
      ),
    pronoun: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    age: z.coerce.number().min(18).max(35),
    status: z.enum(["active", "inactive", "invisible"]),
    checked: z.boolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords did not match",
    path: ["confirm_password"],
  });

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: undefined,
      checked: false,

      email: "",
      password: "",
      confirm_password: "",
      pronoun: "",
      name: {
        firstName: "",
        lastName: "",
      },
      status: "active",
      age: 25,
      bio: "",
    },
  });

  const fnameW = form.watch("name.firstName");
  const lnameW = form.watch("name.lastName");
  const ageW = form.watch("age");
  const emailW = form.watch("email");
  const passW = form.watch("password");
  const confirm_passW = form.watch("confirm_password");
  const [disabledCheck, setDisabledCheck] = React.useState(true);
  React.useEffect(() => {
    if (
      fnameW !== "" ||
      lnameW !== "" ||
      emailW !== "" ||
      passW !== "" ||
      confirm_passW !== ""
    ) {
      setDisabledCheck(false);
    } else {
      setDisabledCheck(true);
    }
  }, [fnameW, lnameW, ageW, emailW, passW, confirm_passW]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Form submitted successfully:", values);
      // Here you would typically send the data to your backend
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  // console.log(form.formState.errors);
  return (
    <AuthLayout>
      <div className="h-[85vh] w-full max-w-md overflow-hidden flex flex-col bg-white bg-opacity-35 p-8 rounded-md border-2 border-slate-200">
        <h2 className="mb-5 font-pacifico text-3xl">Sign Up</h2>

        <Form {...form}>
          <form
            style={{ boxSizing: "border-box" }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 overflow-y-auto hidden-scrollbar flex-1 text-lg "
          >
            {/* Name */}
            <div className="flex space-x-3">
              <FormField
                control={form.control}
                name="name.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-3">
              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="18"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Pronoun */}
            <FormField
              control={form.control}
              name="pronoun"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronoun</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Exp: He | She | They | Them"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            {/* photo */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon_doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*confirm Password */}
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checked"
              render={() => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...form.register("checked")}
                    disabled={disabledCheck}
                  />
                  <label
                    htmlFor="checked"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default Register;
