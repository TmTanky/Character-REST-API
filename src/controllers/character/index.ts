import { Router } from 'express'
import * as call from '../../services/character'

const router = Router()

router.route('/characters').get(call.allCharacters)
router.route('/character').post(call.createCharacter)
router.route('/character/:id').get(call.getCharacter)

export default router
