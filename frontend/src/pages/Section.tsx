/* eslint-disable @typescript-eslint/no-empty-function */
import { Appbar, ContentEditor, SvgIcon, TextEditorPopup } from 'components';
import { AgreementContext, AuthContext, SectionContext } from 'contexts';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-2.svg';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { StringBank } from 'strings';
import { BtnCapital } from 'components/DropDownMenu/style';
import { useTranslation } from 'react-i18next';
import {
  calcTimeAgoFromDate,
  getRemainingSupporters,
  getVersionProgress,
  getVoteColor,
} from 'utils/functions';
import { useNavigate, useParams } from 'react-router-dom';
import { textSecondaryColor } from 'theme';
import { Section as SectionType } from 'types';
import { JSONContent } from '@tiptap/react';
import { addCommentVars } from 'contexts/section';
import { Comment } from 'types/entities';

const Section: FC = () => {
  const { role } = useContext(AuthContext);
  console.log('role', role);
  const theme = useTheme();
  const { section, addVersion, addComment, comments, deleteComment } = useContext(SectionContext);
  const { agreement, vote } = useContext(AgreementContext);
  const { versionId } = useParams();
  const [displayedVersion, setDisplayedVersion] = useState(
    section?.versions?.find((v) => v.id === Number(versionId))
  );
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);
  const commentVars: addCommentVars = {
    variables: {
      section_version_id: displayedVersion?.id || -1,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (commentVars.variables.section_version_id !== -1) {
      addComment!(commentVars);
    }
  }, [displayedVersion]);

  useEffect(() => {
    setDisplayedVersion(section?.versions?.find((v) => v.id === Number(versionId)));
  }, [section, versionId]);
  const { t } = useTranslation();

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setIsSnackbarVisible(true);
  }

  function getIconColor(voteType: 'up' | 'down'): string {
    return getVoteColor(theme, voteType, displayedVersion?.my_vote);
  }

  function generateVersionName(section: SectionType | undefined): string {
    const versionNum = (section?.versions?.length ?? NaN) + 1;
    return `${t(StringBank.VERSION)} ${versionNum}`;
  }

  function handleComplete(editorContent: JSONContent) {
    if (!section || !addVersion) {
      return;
    }
    addVersion({
      variables: {
        content: editorContent,
        sectionId: section.id,
      },
    });
    setIsTextPopupOpen(false);
  }

  function handelDeleteComment(commentId: number) {
    if (deleteComment) {
      deleteComment({
        variables: {
          id: commentId,
        },
      });
    }
  }

  return (
    <>
      <Appbar
        breadcrumbs={[
          {
            name: agreement?.name ?? '',
            link: '..',
            icon: DocIcon,
          },
          {
            name: `${t(StringBank.SECTION)} ${section?.index}`,
          },
        ]}
        actions={[
          {
            icon: <EyeIcon />,
            onClick: () => navigate('../draft'),
            title: t(StringBank.VIEW_DRAFT),
          },
        ]}
      />
      <Stack direction="row" spacing={1} marginY={2}>
        {section?.versions.map((version, i) => (
          <Chip
            deleteIcon={<CheckCircleIcon />}
            onDelete={version.id === section.current_version?.id ? () => {} : undefined}
            onClick={() => navigate(`../section/${section.id}/${version.id}`)}
            label={`${t(StringBank.VERSION)} ${i + 1}`}
            key={version.id}
            color={displayedVersion === version ? 'primary' : 'default'}
          />
        ))}
        <Chip
          sx={{ '& .MuiChip-label': { paddingX: 0.5, display: 'flex' } }}
          onClick={() => {
            setIsTextPopupOpen(true);
          }}
          label={
            <SvgIcon htmlColor={textSecondaryColor} width="24px">
              <PlusIcon />
            </SvgIcon>
          }
        />
        <TextEditorPopup
          key={displayedVersion?.id}
          isOpen={isTextPopupOpen}
          parentSection={`${t(StringBank.SECTION)} ${section?.index}`}
          newVersionName={generateVersionName(section)}
          onComplete={handleComplete}
          onCancel={setIsTextPopupOpen}
          completeBtnText={t(StringBank.ADD_VERSION)}
          cancelBtnText={t(StringBank.CANCEL)}
          initialContent={displayedVersion?.content}
          editorPlaceholder={t(StringBank.INSERT_NEW_VERSION)}
        />
      </Stack>
      {displayedVersion && (
        <Card variant="elevation" elevation={0}>
          <CardContent sx={{ paddingX: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <BtnCapital className="capital">
                  {displayedVersion?.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
                </BtnCapital>
                <Typography variant="h6">
                  {displayedVersion?.author?.full_name || t(StringBank.ANONYMOUS)}
                </Typography>
                <Typography variant="caption">
                  {displayedVersion?.created_at?.toLocaleDateString(navigator.language)}
                </Typography>
              </Stack>
              <Stack direction="row">
                <IconButton size="small" onClick={handleShare}>
                  <SvgIcon htmlColor={textSecondaryColor}>
                    <LinkIcon />
                  </SvgIcon>
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    console.log('deleteing ');
                  }}
                >
                  <SvgIcon htmlColor={textSecondaryColor}>
                    <TrashIcon />
                  </SvgIcon>
                </IconButton>
              </Stack>
            </Stack>
            <Box paddingY={4}>
              <ContentEditor readonly content={displayedVersion?.content} />
            </Box>
            <Stack spacing={1} direction="row" alignItems="center">
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
                <IconButton onClick={() => displayedVersion && vote(displayedVersion, 'up')}>
                  <SvgIcon htmlColor={getIconColor('up')}>
                    <LikeIcon />
                  </SvgIcon>
                </IconButton>
                <Typography color={getIconColor('up')}>{displayedVersion?.upvotes}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
                <IconButton onClick={() => displayedVersion && vote(displayedVersion, 'down')}>
                  <SvgIcon htmlColor={getIconColor('down')}>
                    <DislikeIcon />
                  </SvgIcon>
                </IconButton>
                <Typography color={getIconColor('down')}>{displayedVersion?.downvotes}</Typography>
              </Stack>
              <Tooltip
                title={t(StringBank.REMAINING_SUPPORTERS, {
                  count: getRemainingSupporters(displayedVersion),
                })}
                arrow
                placement="top"
              >
                <LinearProgress
                  variant="determinate"
                  value={getVersionProgress(displayedVersion)}
                  sx={{ flexGrow: 1 }}
                />
              </Tooltip>
            </Stack>
          </CardContent>
        </Card>
      )}
      {displayedVersion && comments && comments.core_comments.length > 0 && (
        <Card variant="elevation" elevation={0} sx={{ marginTop: '1rem' }}>
          <CardContent>
            <Container maxWidth="sm">
              {comments?.core_comments.map((comment: Comment) => {
                return (
                  <Stack
                    key={comment.id}
                    direction="row"
                    spacing={4}
                    marginBottom={4}
                    justifyContent="center"
                  >
                    <Stack alignItems="center" paddingTop={1}>
                      <BtnCapital className="capital">
                        {displayedVersion?.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
                      </BtnCapital>
                    </Stack>
                    <Stack>
                      <Stack direction="row" spacing={2}>
                        <Box>
                          <Typography>{comment.author.full_name}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption">
                            {calcTimeAgoFromDate(comment.created_at)}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => {
                              console.log('deleteing comment');
                              handelDeleteComment(comment.id);
                            }}
                          >
                            <SvgIcon htmlColor={textSecondaryColor}>
                              <TrashIcon />
                            </SvgIcon>
                          </IconButton>
                        </Box>
                      </Stack>
                      <Stack direction="row">{comment.content}</Stack>
                    </Stack>
                  </Stack>
                );
              })}
            </Container>
          </CardContent>
        </Card>
      )}
      <Snackbar
        open={isSnackbarVisible}
        message={t(StringBank.URL_COPIED_SUCCESSFULLY)}
        autoHideDuration={4000}
        onClose={() => setIsSnackbarVisible(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
};

export default Section;
