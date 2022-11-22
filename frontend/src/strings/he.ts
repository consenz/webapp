import { StringBank } from './bank';

export const he: Partial<Record<StringBank, string>> = {
  AGREEMENT_PARTICIPANTS: '{{count}} משתתפים',
  AGREEMENT_UPDATED_AT: 'עדכון אחרון: {{date}}',
  GROUP_AGREEMENTS: 'ההסכמים של {{group}}',
  CATEGORY_AGREMENTS: 'הסכמים פעילים בקטגוריה {{category}}',
  ADD_NEW_CATEGORY: 'הוספת קטגוריה',
  ADD_COMMENT_IN_SECTION: 'הוספת הערה על ההצעה הנוכחית',
  ADD_RATIONALE_HEADER: 'דברי הסבר',
  ADD_RATIONALE_PARAGRAPH: `למה זקוקים להסכם הזה? מה הרקע ליצירתו? מה אלה הצרכים והבעיות שהוא נועד לספק להם מענה? ...`,
  AGREEMENT_NAME_FIELD: 'כותרת ההסכם',
  AGREEMENT_LAST_UPDATED: 'עדכון אחרון: {{date}}',
  ALL_AGREEMENTS: 'כל ההסכמים',
  ARCHIVE: 'ארכיון',
  ARCHIVE_EMPTY_MESSAGE: 'וכאן זה המקום בו יהיוההסכמים שלנו שבארכיב',
  ARCHIVE_EMPTY_MESSAGE_END: 'אם היו כאלה...',
  CATEGORY: 'קטגוריה',
  CATEGORIES: 'קטגוריות',
  CANCEL: 'ביטול',
  CATEGORY_EMPTY_MESSAGE: 'אולי תרצו ליצור אחד',
  CONTINUE: 'להמשיך',
  COMMNET_POSTED: 'הערה נשלחה בהצלחה',
  CURRENT_VERSION: 'הגרסה הנוכחית',
  DELETE_COMMNET: 'מחק הערה',
  GOTO_HOMEPAGE_TITLE: 'לעבור לדף הבית',
  LOGOUT: 'יציאה',
  NEW_AGREEMENT: 'הסכם חדש',
  NEW_SECTION: 'חלק חדש',
  TIME_LIMITED: 'מוגבל בזמן',
  UNARCHIVE: 'העברה מארכיון',
  URL_COPIED_SUCCESSFULLY: 'כתובת הועתקה בהצלחה',
  WELCOME_HEADER: 'ברוכים הבאים לקונסנז!',
  WELCOME_PARAGRAPH: `אתן עוד לא חלק מקבוצה.
  בקשו ממנהל הקבוצה שלכן הזמנה על מנת להשתתף
  
  ותהנו!`,
  CONFIRM_COMMENT_DELETE: 'אנא רשמו "תגובה" כדי לאשר את המחיקה',
  CONFIRM_SECTION_VERSION_DELETE: 'הפעולה המבוקשת תמחוק את ההצעה ואת ההערות שעליה. אתם בטוחים?',
  PUBLISH: 'פרסום',
  VIEW_CURRENT_DRAFT: 'צפייה בגרסה הנוכחית',
  INSERT_NEW_VERSION: 'אנא הזינו הצעה לסעיף חדש',
  INSERT_NEW_SECTION_SHORT: 'אנא הזינו חלק חדש',
  NO_CATEGORY: 'לא נבחרה קטגוריה',
  READ_MORE: 'קרא/י עוד',
  REMAINING_SUPPORTERS: 'עוד {{count}} תומכים נדרשים לאישור ההצעה',
  SECTION_CARD_TITLE_CHAPTER: '# {{chapterName}}',
  SECTION_CARD_TITLE_SECTIONS: '{{sectionNum}} סעיפים',
  SECTION_CARD_TITLE_VERSIONS: '{{versionsNum}} הצעות',
  SECTION_CARD_CONTENT_SECTION_NAME: 'סעיף {{sectionNum}}',
  SECTION_CARD_CONTENT_VERSIONS: ' גרסה {{versionNum}} מתוך {{totalVersionsNum}} ',
};
