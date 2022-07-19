import AddIcon from '@mui/icons-material/Add';
import img from '../assets/Group_120.png';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useParams } from 'react-router-dom';
import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data';
import { Button, Stack, Typography } from '@mui/material';
import AgreementCard from 'components/AgreementCard/AgreementCard';

const AllAgreements: FC = () => {
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { user } = useContext(DataContext);

  const getGroupBySlug = (slug?: string) => user?.groups?.find((group) => group.slug === slug);

  return (
    <Stack justifyContent="space-between" height="100%" padding={2}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h2">
          {t(StringBank.GROUP_AGREEMENTS, { group: getGroupBySlug(groupSlug)?.name })}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          {t(StringBank.NEW_AGREEMENT)}
        </Button>
      </Stack>
      {getGroupBySlug(groupSlug)?.agreements?.length ? (
        <AgreementCard
          icon="add"
          participants="14"
          tag="finance"
          title="payments"
          updatedAt="2022"
        />
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <Stack flexDirection="row" justifyContent="center">
            <img src={img} alt="" />
          </Stack>
          <Typography variant="h1" paddingY={5}>
            {t(StringBank.CREATE_FIRST_AGREEMENT)}
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            {t(StringBank.NEW_AGREEMENT)}
          </Button>
        </Stack>
      )}
      <Stack />
    </Stack>
  );
};

export default AllAgreements;
