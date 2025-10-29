import z from "zod";

export const contactFields = [
  {
    name: "name",
    label: "Как к Вам обращаться?",
    type: "text",
    placeholder: "Иванов Иван Иванович",
    validation: z.string().min(1, "Имя обязательно для заполнения"),
  },
  {
    name: "phone",
    label: "Телефон для связи",
    type: "tel",
    placeholder: "+7 999 999-99-99",
    mask: "+7 000 000-00-00",
    validation: z
      .string()
      .regex(
        /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/,
        "Неверный формат номера телефона"
      ),
  },
  {
    name: "message",
    label: "Текст сообщения",
    type: "textarea",
    placeholder: "Опишите проблему или ошибку...",
    validation: z.string().min(1, "Сообщение обязательно для заполнения"),
  },
];

export const joinUsFields = [
  {
    name: "userName",
    label: "Ваше имя",
    placeholder: "Иван Менеджер 3 см",
    groupId: "row1",
    size: "lg",
    colSpan: 3,
  },
  {
    name: "companyName",
    label: "Название Вашей компании",
    placeholder: "Платёжка онлайн",
    groupId: "row1",
    size: "lg",
    colSpan: 3,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "mail@mail.ru",
    validation: z.email("Неверно указан Ваш E-mail"),
    groupId: "row2",
    size: "lg",
    colSpan: 1,
  },
  {
    name: "phone",
    label: "Номер телефона",
    type: "tel",
    placeholder: "+7 999 999-99-99",
    mask: "+7 000 000-00-00",
    validation: z
      .string()
      .regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, "Номер телефона указан неверно"),
    groupId: "row2",
    size: "lg",
    colSpan: 1,
  },
  {
    name: "aboutCompany",
    label: "Информация о Вашей компании",
    placeholder: "Расскажите о себе, не стесняйтесь!",
    type: "textarea",
    validation: z.string().min(6, "Расскажите о себе подробнее"),
  },
];
