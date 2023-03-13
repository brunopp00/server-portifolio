import fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from "@prisma/client"

const app = fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/getPrograms', async() => {
    const programs = await prisma.programs.findMany()

    return  programs
})

app.post('/setProgram', async (req, res) => {
    const programData = req.body;
    const id = req.body.id;
    const data = {
      title: programData.title,
      description: programData.description || '', // definir valor padrão vazio caso seja opcional
      urlRepo: programData.urlRepo || '', // definir valor padrão vazio caso seja opcional
      urlScreen: programData.urlScreen || '', // definir valor padrão vazio caso seja opcional
      img: programData.img || '', // definir valor padrão vazio caso seja opcional
    };
  
    if (!id) {
      await prisma.programs.create({ data });
    } else {
      const program = await prisma.programs.findUnique({
        where: { id },
      });
  
      if (!program) {
        return res.status(404).send({ error: 'Program not found' });
      } else {
        await prisma.programs.update({
          where: { id },
          data,
        });
      }
    }
    res.send({ status: true });
  });

  app.delete('/excluiPrograma', async (req, res) => {
    const id = req.body.id;
    await prisma.programs.delete({
        where: { id: id }
    });
    res.send({ status: true });
});

app.listen({
    port: 3333
})