import { Router } from "express";
import { create, update, remove, readAll, readOne } from '../controllers/note'

const router = Router()

router.post('/create', create)

router.patch('/:noteId',update)

router.delete('/:noteId', remove)

router.get('/', readAll)

router.get('/:id', readOne)

export default router