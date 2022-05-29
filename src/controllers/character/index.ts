import { Router } from 'express'
import * as call from '../../services/character'

const router = Router()

router.get('/characters', call.allCharacters)
router.post('/character', call.createCharacter)
router.get('/character/:id', call.getCharacter)

export default router
