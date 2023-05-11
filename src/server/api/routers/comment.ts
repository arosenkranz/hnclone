import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  getCommentsByPostId: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
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
    .input(z.object({ postId: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      console.log(ctx.session.user);
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          post: {
            connect: {
              id: input.postId,
            },
          },
          author: {
            connect: {
              email: ctx.session.user.email,
            },
          },
        },
      });
    }),

  upvoteComment: protectedProcedure
    .input(z.object({ voteId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comment.update({
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
    .input(z.object({ voteId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comment.update({
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
