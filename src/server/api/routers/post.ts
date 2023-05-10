import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        comments: true,
        author: true,
      },
    });
  }),

  getPostById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          comments: true,
          author: true,
        },
      });
    }),

  createPost: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), slug: z.string() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          slug: input.slug,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  upvotePost: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          votes: {
            increment: 1,
          },
        },
      });
    }),

  downvotePost: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          votes: {
            decrement: 1,
          },
        },
      });
    }),
});
