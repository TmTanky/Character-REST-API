import { Router } from 'express'
import * as call from '../../services/character'

const router = Router()

router.get('/characters', call.allCharacters)
router.post('/character', call.createCharacter)
router
  .route('/character/:id')
  .get(call.getCharacter)
  .put(call.updateCharacter)
  .delete(call.deleteCharacter)

export default router
