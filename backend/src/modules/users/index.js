import { prisma } from "../data/index.js";

export const list = async (ctx, next) => {
  try {
    const users = await prisma.user.findMany();
    ctx.body = users
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Internal Server Error";
    console.log(error);
    return;
  }
}

export const create = async (ctx, next) => {
  try {
    const { name, email, password } = ctx.request.body;


    if (!name || !email || !password) {
      ctx.status = 400;
      ctx.body = { error: 'Nome, email e senha são obrigatórios' };
      return;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    ctx.status = 201;
    ctx.body = {
      message: 'Usuário criado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

export const update = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { name, email, password } = ctx.request.body;

    // Atualizar no banco
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password })
      },
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true
      }
    });

    ctx.body = {
      message: 'Usuário atualizado com sucesso',
      user: updatedUser
    };
  } catch (error) {
    if (error.code === 'P2025') {
      ctx.status = 404;
      ctx.body = { error: 'Usuário não encontrado' };
      return;
    }
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};

export const remove = async (ctx, next) => {
  try {
    const { id } = ctx.params;

    // Verificar se usuário existe antes de deletar
    const userExists = await prisma.user.findUnique({
      where: { id }
    });

    if (!userExists) {
      ctx.status = 404;
      ctx.body = { error: 'Usuário não encontrado' };
      return;
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        deletedAt: true
      }
    });

    ctx.status = 200;
    ctx.body = {
      message: 'Usuário deletado com sucesso',
      user: deletedUser
    };

  } catch (error) {
    if (error.code === 'P2025') {
      ctx.status = 404;
      ctx.body = { error: 'Usuário não encontrado' };
      return;
    }

    if (error.code === 'P2003') {
      ctx.status = 409;
      ctx.body = {
        error: 'Não é possível deletar usuário com dados relacionados'
      };
      return;
    }

    console.error('Erro no delete:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro interno do servidor' };
  }
}

