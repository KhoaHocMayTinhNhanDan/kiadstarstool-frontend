/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Mail, Phone, Calendar, MapPin, User } from 'lucide-react';
import { Box, Text, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { type GetStudentDetailsOutput } from '@/02-usecases/students/ports/output/GetStudentDetails.output';
import { InfoItem } from './StudentSharedComponents';

interface StudentProfileCardProps {
  student: GetStudentDetailsOutput;
}

export const StudentProfileCard = ({ student }: StudentProfileCardProps) => {
  return (
    <Box 
      p="xl" 
      bg="BACKGROUND_PAPER" 
      borderRadius="lg" 
      border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
      css={css`box-shadow: ${SHADOWS.sm};`}
      display="flex"
      flexDirection="column"
      gap="lg"
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" gap="lg" alignItems="center">
          <Box 
            w="64px" h="64px" 
            bg="PRIMARY_LIGHT" 
            borderRadius="full" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            color="PRIMARY"
          >
            <Icon size="xl"><User /></Icon>
          </Box>
          <Box>
            <Text as="h1" variant="heading-lg" weight="bold" mb="xs">{student.name}</Text>
            <Box display="flex" gap="sm" alignItems="center">
              <Box px="sm" py="xxs" bg={student.status === 'active' ? 'SUCCESS_LIGHT' : 'NEUTRAL_LIGHT'} borderRadius="full">
                <Text size="xs" weight="bold" color={student.status === 'active' ? 'SUCCESS' : 'SECONDARY'}>
                  {student.status === 'active' ? 'Đang học' : 'Đã nghỉ'}
                </Text>
              </Box>
              <Text size="sm" color="SECONDARY">ID: {student.id}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box 
        display="grid" 
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" 
        gap="lg"
        pt="lg"
        borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}
      >
        <InfoItem icon={<Mail />} label="Email" value={student.email} />
        <InfoItem 
          icon={<Phone />} 
          label="Điện thoại" 
          value={
            student.phone ? (
              student.phone.split(' - ').map((p, i) => <div key={i}>{p}</div>)
            ) : 'N/A'
          } 
        />
        <InfoItem icon={<MapPin />} label="Chi nhánh" value={student.branchName || 'Chưa phân lớp'} />
        <InfoItem 
          icon={<Calendar />} 
          label="Ngày tham gia" 
          value={student.joinedDate ? new Date(student.joinedDate).toLocaleDateString('vi-VN') : 'N/A'} 
        />
      </Box>
    </Box>
  );
};