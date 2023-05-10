import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  getCommentsByPostId: publicProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comments.findMany({
        where: {
          postId: input.postId,
        },
        include: {
          post: true,
          author: true,
        },
      });
    }),

  createComment: protectedProcedure
    .input(z.object({ postId: z.string().uuid(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comments.create({
        data: {
          content: input.content,
          post: {
            connect: {
              id: input.postId,
            },
          },
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  upvoteComment: protectedProcedure
    .input(z.object({ voteId: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comments.update({
        where: {
          id: input.voteId,
        },
        data: {
          votes: {
            increment: 1,
          },
        },
      });
    }),

  downvoteComment: protectedProcedure
    .input(z.object({ voteId: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comments.update({
        where: {
          id: input.voteId,
        },
        data: {
          votes: {
            decrement: 1,
          },
        },
      });
    }),
});
