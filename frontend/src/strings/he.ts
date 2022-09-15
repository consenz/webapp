import { StringBank } from './bank';

export const he: Partial<Record<StringBank, string>> = {
  AGREEMENT_PARTICIPANTS: '{{count}} משתתפים',
  AGREEMENT_UPDATED_AT: 'עדכון אחרון: {{date}}',
  GROUP_AGREEMENTS: 'ההסכמים של {{group}}',
  CATEGORY_AGREMENTS: 'ההסכמים האקטיביים של הקטגוריה {{category}}',
  ADD_NEW_CATEGORY: 'הוספת קטגוריה',
  ADD_RATIONALE_HEADER: 'להוסיף היגיון',
  ADD_RATIONALE_PARAGRAPH: `למה זקוקים להסכם הזה? מה הרקע ליצירתו? מה אלה הצרכים והבעיות שהוא נועד להשיב? ...`,
  AGREEMENT_NAME_FIELD: 'כותרת ההסכם',
  ALL_AGREEMENTS: 'כל ההסכמים',
  ARCHIVE: 'ארכיון',
  ARCHIVE_EMPTY_MESSAGE_FIRST: 'וכאן זה המקום בו יהיו',
  ARCHIVE_EMPTY_MESSAGE_SEC: 'ההסכמים שלנו שבארכיב',
  ARCHIVE_EMPTY_MESSAGE_END: 'אם היו כאלה...',
  CATEGORY: 'קטגוריה',
  CATEGORY_EMPTY_MESSAGE: 'אולי תרצו ליצור אחד',
  CONTINUE: 'להמשיך',
  GOTO_HOMEPAGE_TITLE: 'לעבור לדף הבית',
  LOGOUT: 'יציאה',
  NEW_AGREEMENT: 'הסכם חדש',
  TIME_LIMITED: 'מוגבל בזמן',
  UNARCHIVE: 'העברה מארכיון',
  WELCOME_HEADER: 'ברוכים הבאים לקונסנז!',
  WELCOME_PARAGRAPH: `אתן עוד לא חלק מקבוצה.
  בקשו ממנהל הקבוצה שלכן הזמנה על מנת להשתתף
  
  ותהנו!`,
  NO_CATEGORY: 'לא נבחרה קטגוריה',
  SECTION_CARD_TITLE_CHAPTER: '# {{chapterName}}',
  SECTION_CARD_TITLE_SECTIONS: '{{sectionNum}} חלקים',
  SECTION_CARD_TITLE_SUGGESTIONS: '{{suggestionsNum}} הצעות',
  SECTION_CARD_CONTENT_SECTION_NAME: 'חלק {{sectionNum}}',
  SECTION_CARD_CONTENT_VERSIONS: 'גרסא {{versionNum}} מתוך {{totalVersionsNum}}',
};
