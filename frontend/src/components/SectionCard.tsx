import { Card, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useContext, useState } from 'react';
import { ReactComponent as LikeIcon } from 'assets/icons/like-outlined.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentEditor from 'components/ContentEditor';
import { ISection } from 'types/entities';
import { ColorModeAndDirectionContext } from 'theme';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { AgreementContext } from 'contexts/agreement';
import { IAgreementContext } from 'types';

const SectionCard = (props: ISection) => {
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
  const [versionIndex, setversionIndex] = useState<number>(0);
  const agreementContext: IAgreementContext = useContext(AgreementContext);
  const { vote } = agreementContext;
  const userId = props.userId;
  const updateContent = (newversionIndex: number) => {
    setversionIndex(newversionIndex);
  };

  const forwardVersion = () => {
    if (versionIndex + 1 < props.versions.length) {
      const newIndex = versionIndex + 1;
      updateContent(newIndex);
    }
  };

  const backwardsVersion = () => {
    if (versionIndex - 1 >= 0) {
      const newIndex = versionIndex - 1;
      updateContent(newIndex);
    }
  };

  const currentVersion = props.versions[versionIndex];

  return (
    <Card variant="elevation" elevation={0} sx={{ paddingX: 1 }}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <IconButton
          sx={{
            width: 'min-contnet',
          }}
          onClick={backwardsVersion}
          disabled={versionIndex === 0}
        >
          {isRTL ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </IconButton>
        <Stack
          id="contentCol"
          justifyContent="center"
          direction="column"
          paddingTop={4}
          paddingBottom={2}
          flexGrow={1}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="body2"
              sx={{
                fontWeight: '700',
                color: '#E0E0E0',
              }}
            >
              {t(StringBank.SECTION_CARD_CONTENT_SECTION_NAME, { sectionNum: props.index })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(StringBank.SECTION_CARD_CONTENT_VERSIONS, {
                versionNum: versionIndex + 1,
                totalVersionsNum: props.versions.length,
              })}
            </Typography>
            <CheckCircleOutlineIcon htmlColor="#24ebd3" fontSize="inherit" />
          </Stack>
          <Stack direction="row">
            <Typography>
              <ContentEditor
                key={currentVersion.id}
                initialContent={currentVersion.content}
                readonly={true}
              />
            </Typography>
          </Stack>
          <Stack gap="1rem" direction="row">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <LikeIcon
                  onClick={() => {
                    vote(userId, currentVersion.id, 'up');
                  }}
                />
              </IconButton>
              <Typography color="#24ebd3">{currentVersion.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <DislikeIcon
                  onClick={() => {
                    vote(userId, currentVersion.id, 'down');
                  }}
                />
              </IconButton>
              <Typography>{currentVersion.downvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <CommentIcon />
              </IconButton>
              <Typography>{5}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton
          sx={{
            width: 'min-contnet',
          }}
          disabled={versionIndex === props.versions.length - 1}
          onClick={forwardVersion}
        >
          {isRTL ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
      </Stack>
    </Card>
  );
};

export default SectionCard;
