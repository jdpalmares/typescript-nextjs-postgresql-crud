import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const userSchema = z.object({
  name: z.string(),
  email: z.string()
});

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string()
});

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure //hello world
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAllExample: publicProcedure.query(({ ctx }) => { //get example
    return ctx.db.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => { //get secret message
    return "you can now see this secret message!";
  }),

  getAllUsers: publicProcedure.query(({ctx}) => { //get all users
    return ctx.db.user.findMany();
  }),

  getOneUser: publicProcedure //get one user
    .input(idSchema)
    .query( ({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: idSchema.parse(input),
      });
    }),

  createUser: publicProcedure //create a user
    .input(userSchema)
    .mutation(({input, ctx}) => {
      return ctx.db.user.create({
        data: userSchema.parse(input),
      });
    }),

  updateUser: publicProcedure //update a user
  .input(userUpdateSchema)
  .mutation(({input, ctx}) => {
    return ctx.db.user.update({
      where: {
        id: input.id.toString(),
      },
      data: userUpdateSchema.parse(input),
    });
  }),

  deleteUser: publicProcedure //delete a user
  .input(idSchema)
  .mutation(({input, ctx}) => {
    return ctx.db.user.delete({
      where: idSchema.parse(input),
    });
  }),

});
