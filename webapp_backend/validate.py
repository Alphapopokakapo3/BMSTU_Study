def validate_new_homework_data(user_id, subject, description,
                                due_at, lesson_type, kind, due_week):
    v_user_id = isinstance(user_id, int)
    v_subject = isinstance(subject, str)
    v_description = isinstance(description, str)
    v_due_at = isinstance(due_at, int)
    v_lesson_type = lesson_type in ["seminar", "lecture", "lab"]
    v_kind = kind in ["regular", "stand"]
    v_due_week = isinstance(due_week, int)

    return all([v_user_id, v_subject, v_description, v_due_at,
                v_lesson_type, v_kind, v_due_week])