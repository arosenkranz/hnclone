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
        author: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }),

  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
          author: true,
          _count: {
            select: {
              comments: true,
            },
          },
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
    .input(z.object({ id: z.string() }))
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
    .input(z.object({ id: z.string() }))
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
