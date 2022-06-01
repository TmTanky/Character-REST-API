import { RequestHandler } from 'express'
import createError from 'http-errors'
import { connectClient } from './client'

export const createCharacter: RequestHandler = async (req, res, next) => {
  const { name } = req.body as { name: string }

  if (!name) return next(createError(400, 'Name is required.'))

  try {
    const client = await connectClient()
    const character = await client.character.create({
      data: {
        name,
        createdAt: new Date()
      }
    })

    res.status(201).json({
      data: character,
      message: 'Character created successfully.'
    })
  } catch (error) {
    return next(createError(500, 'Something went wrong.'))
  }
}

export const allCharacters: RequestHandler = async (req, res, next) => {
  try {
    const client = await connectClient()
    const allCharacters = await client.character.findMany()

    res.status(200).json({
      totalCharacters: allCharacters.length,
      data: allCharacters
    })
  } catch (error) {
    return next(createError(500, 'Something went wrong.'))
  }
}

export const getCharacter: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  if (!id) return next(createError(400, 'Id is required.'))

  try {
    const client = await connectClient()
    const queriedCharacter = await client.character.findUnique({
      where: {
        id
      }
    })

    if (!queriedCharacter) {
      return res.status(404).json({
        data: null,
        message: 'Character not found.'
      })
    }

    return res.status(200).json({
      data: queriedCharacter
    })
  } catch (e) {
    const { code } = e as any as { code: string }

    if (code === 'P2023') {
      return next(createError(400, 'Not a valid Id.'))
    }

    return next(createError(500, 'Something went wrong.'))
  }
}

export const updateCharacter: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body as { name: string }

  if (!id || !name) return next(createError(400, 'Id/Name is required.'))

  try {
    const client = await connectClient()
    const toBeUpdated = await client.character.update({
      data: {
        name: name
      },
      where: { id }
    })

    if (!toBeUpdated) {
      return next(createError(404, 'Character not found.'))
    }

    return res.status(201).json({
      message: 'Update Successful',
      data: toBeUpdated
    })
  } catch (error) {
    const { code } = error as any as { code: string }

    if (code === 'P2025') return next(createError(400, 'Character not found.'))
    return next(createError(500, 'Something went wrong.'))
  }
}

export const deleteCharacter: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  if (!id) return next(createError(400, 'Id/Name is required.'))

  try {
    const client = await connectClient()
    const toBeDeleted = await client.character.delete({
      where: {
        id
      }
    })

    if (!toBeDeleted) return next(createError(404, 'Character not found.'))

    return res.status(204)
  } catch (error) {
    const { code } = error as any as { code: string }
    if (code === 'P2025') return next(createError(400, 'Character not found.'))

    return next(createError(500, 'Something went wrong.'))
  }
}
