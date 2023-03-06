import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient();

const home = async (request, response) => {
    const todos = await prisma.todos.findMany({
        orderBy: {
            todo_id: 'asc'
        }
    })

    return response.render('home.ejs', { todos: todos })
}


const insert = async (request, response) => {
    const { title, content } = request.body
    let error = null;
    switch (request.method) {

        case 'GET': {
            return response.render('insert.ejs', { error: null })
        }
        case 'POST': {

            if (!request.body.title || !request.body.content) {
                error = 'Fill all blank fields'
            }
            if (error) {
                return response.render('insert.ejs', { error: error })
            }


            await prisma.todos.create({
                data: {

                    title: title,
                    content: content
                }


            })
            return response.redirect('/')
        }
        default:
            return response.render('error.ejs')
    }


}

const view = async (request, response) => {
    try {
        const { id } = request.params

        const todo_id = await prisma.todos.findUnique({
            where: {
                todo_id: parseInt(id)
            }
        })
        return response.render('view.ejs', todo_id)

    } catch (error) {
        return response.render('error.ejs')
    }
}

const update = async (request, response) => {
    const { id } = request.params
    const { title, content } = request.body

    switch (request.method) {
        case 'GET': {
            const todo = await prisma.todos.findUnique({
                where: {
                    todo_id: parseInt(id)
                }
            })
            return response.render('update.ejs', { ...todo, error: null })
        }
        case 'POST': {
            let error = null

            if (!request.body.title || !request.body.content) {
                error = 'Fill all blank fields'
            }

            if (error) {
                return response.render('add.ejs', { error: error })
            }
            await prisma.todos.update({
                data: {
                    title: title,
                    content: content
                },
                where: {
                    todo_id: parseInt(id)
                }


            })
            return response.redirect('/')
        }
        default:
            return response.render('error.ejs')
    }


}

const suppr = async (request, response) => {
    const { id } = request.params

    await prisma.todos.delete({
        where: {
            todo_id: parseInt(id)
        }
    })
    return response.redirect('/')
}

const search = async (request, response) => {
    const query = request.query.q

    const data = await prisma.todos.findMany({
        orderBy: {
            todo_id: 'asc'
        }
    })

    let resultats = data.filter(objet => objet.title.includes(query))

    return response.render('search.ejs', { query: query, data: resultats })

}

export { home, insert, view, update, suppr, search }