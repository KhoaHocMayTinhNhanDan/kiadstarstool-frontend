/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button, Card, Icon, Input } from '../../../00-design-system/00-atoms';
import { AppContext } from '@/05-bootstrap/app-context';
import { type GetBranchDetailsOutput, type DayOfWeek } from '@/02-usecases/branch/ports/output/GetBranchDetails.output';
import { type ListClassesByBranchOutput } from '@/02-usecases/class/ports/output/ListClassesByBranch.output';
import { type StudentListItem } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { ArrowLeft, MapPin, Users, Clock, Edit, Trash2, Calendar, BookOpen, GraduationCap, Plus, X } from 'lucide-react';
import { SPACING } from '../../../01-ui-core/constants/tokens-constants';
import { useI18n } from '@/shared/i18n/useI18n';
import { useBranch } from '../../hooks/branch/useBranch';
import { Pagination } from '../../../00-design-system/02-organisms/navigation/Pagination';

export const BranchDetailPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useI18n();
  const { deleteBranch, isLoading: isDeleting } = useBranch();
  const [branch, setBranch] = useState<GetBranchDetailsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<ListClassesByBranchOutput>([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'students'>('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  
  // State for Create Class Modal
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');
  const [newClassMaxStudents, setNewClassMaxStudents] = useState(20);
  const [isCreatingClass, setIsCreatingClass] = useState(false);

  // State for Create Student Modal
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);

  useEffect(() => {
    const fetchBranch = async () => {
      if (!branchId) return;
      
      setIsLoading(true);
      try {
        const controller = AppContext.getBranchController();
        const result = await controller.getBranchDetails({ branchId });

        if (result.isSuccess) {
          setBranch(result.getValue());
        } else {
          toast.error(result.getErrorValue() as string);
          navigate('/dashboard'); // Redirect if not found
        }
      } catch (error) {
        toast.error('Failed to load branch details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranch();
  }, [branchId]);

  const fetchClasses = async () => {
    if (!branchId || activeTab !== 'classes') return;
    
    setIsLoadingClasses(true);
    try {
      const controller = AppContext.getClassesController();
      const result = await controller.listClassesByBranch(branchId);
      if (result.isSuccess) {
        setClasses(result.getValue());
      }
    } finally {
      setIsLoadingClasses(false);
    }
  };

  const fetchStudents = async () => {
    if (!branchId || activeTab !== 'students') return;
    
    setIsLoadingStudents(true);
    try {
      const controller = AppContext.getStudentsController();
      const result = await controller.listStudentsByBranch({ branchId });
      if (result.isSuccess) {
        setStudents(result.getValue());
        setCurrentPage(1); // Reset về trang 1 khi tải lại dữ liệu
      }
    } finally {
      setIsLoadingStudents(false);
    }
  };

  // Fetch data when tab changes
  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, [branchId, activeTab]);

  const handleDelete = async () => {
    if (!branchId) return;

    if (window.confirm(t('branch.delete_confirm_message'))) {
      const success = await deleteBranch({ branchId });
      if (success) {
        navigate('/branches');
      }
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchId) return;

    setIsCreatingClass(true);
    try {
      const controller = AppContext.getClassesController();
      const result = await controller.createClass({
        branchId,
        name: newClassName,
        code: newClassCode,
        maxStudents: Number(newClassMaxStudents),
        status: ClassStatus.PLANNED
      });

      if (result.isSuccess) {
        toast.success('Class created successfully');
        setIsCreateClassModalOpen(false);
        setNewClassName('');
        setNewClassCode('');
        setNewClassMaxStudents(20);
        fetchClasses(); // Reload list
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Failed to create class');
    } finally {
      setIsCreatingClass(false);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchId) return;

    setIsCreatingStudent(true);
    try {
      const controller = AppContext.getStudentsController();
      const result = await controller.createStudent({
        branchId,
        name: newStudentName,
        email: newStudentEmail,
      });

      if (result.isSuccess) {
        toast.success('Student added successfully');
        setIsCreateStudentModalOpen(false);
        setNewStudentName('');
        setNewStudentEmail('');
        fetchStudents(); // Reload list
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Failed to add student');
    } finally {
      setIsCreatingStudent(false);
    }
  };

  if (isLoading) {
    return <Box p="xl"><Text>{t('branch.loading_detail')}</Text></Box>;
  }

  if (!branch) {
    return <Box p="xl"><Text>{t('branch.not_found')}</Text></Box>;
  }

  return (
    <Box p="xl" maxWidth="800px" mx="auto">
      <Button 
        variant="ghost" 
        leftIcon={<Icon><ArrowLeft /></Icon>} 
        onClick={() => navigate(-1)}
        sx={{ marginBottom: SPACING.lg }}
      >
        {t('branch.detail_back_button')}
      </Button>

      <Box mb="lg" display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-xl" weight="bold">{branch.name}</Text>
          <Text color="SECONDARY">{t('branch.detail_code_label')}: {branch.code}</Text>
        </Box>
        <Box display="flex" gap="sm" alignItems="center">
          <Box 
            px="md" py="xs" 
            bg={branch.isActive ? 'SUCCESS_LIGHT' : 'NEUTRAL_LIGHT'} 
            color={branch.isActive ? 'SUCCESS_DARK' : 'TEXT_SECONDARY'}
            borderRadius="full"
          >
            <Text size="sm" weight="bold">{branch.isActive ? t('branch.detail_status_active') : t('branch.detail_status_inactive')}</Text>
          </Box>
          <Button 
            variant="outline" 
            leftIcon={<Icon><Edit /></Icon>}
            onClick={() => navigate(`/branches/${branchId}/edit`)}
          >
            {t('branch.edit_button')}
          </Button>
          <Button 
            variant="outline" 
            intent="danger"
            leftIcon={<Icon><Trash2 /></Icon>}
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            {t('branch.delete_button')}
          </Button>
        </Box>
      </Box>

      {/* Tabs Navigation */}
      <Box display="flex" gap="md" mb="lg" borderBottom="1px solid" borderColor="NEUTRAL_BORDER">
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab('overview')}
          sx={{ 
            borderBottom: activeTab === 'overview' ? '2px solid' : 'none',
            borderColor: 'PRIMARY',
            borderRadius: '0',
            color: activeTab === 'overview' ? 'PRIMARY' : 'TEXT_SECONDARY'
          }}
        >
          Overview
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab('classes')}
          sx={{ 
            borderBottom: activeTab === 'classes' ? '2px solid' : 'none',
            borderColor: 'PRIMARY',
            borderRadius: '0',
            color: activeTab === 'classes' ? 'PRIMARY' : 'TEXT_SECONDARY'
          }}
        >
          Classes
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab('students')}
          sx={{ 
            borderBottom: activeTab === 'students' ? '2px solid' : 'none',
            borderColor: 'PRIMARY',
            borderRadius: '0',
            color: activeTab === 'students' ? 'PRIMARY' : 'TEXT_SECONDARY'
          }}
        >
          Students
        </Button>
      </Box>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <Card>
          <Box display="flex" flexDirection="column" gap="lg">
            <Box display="flex" gap="md" alignItems="flex-start">
              <Icon color="PRIMARY"><MapPin /></Icon>
              <Box>
                <Text weight="semibold">{t('branch.detail_address_label')}</Text>
                <Text color="SECONDARY">{branch.address}</Text>
              </Box>
            </Box>

            <Box display="flex" gap="md" alignItems="flex-start">
              <Icon color="PRIMARY"><Users /></Icon>
              <Box>
                <Text weight="semibold">{t('branch.detail_capacity_label')}</Text>
                <Text color="SECONDARY">{branch.capacity.current} / {branch.capacity.max} {t('branch.detail_capacity_unit')}</Text>
              </Box>
            </Box>

            <Box display="flex" gap="md" alignItems="flex-start">
              <Icon color="PRIMARY"><Clock /></Icon>
              <Box>
                <Text weight="semibold">{t('branch.detail_operating_hours_label')}</Text>
                <Box as="ul" sx={{ listStyle: 'none', padding: 0, margin: 0, marginTop: SPACING.xs }}>
                  {(Object.keys(branch.operatingHours) as DayOfWeek[]).map((day) => {
                    const hours = branch.operatingHours[day];
                    return (<Box as="li" key={day} display="grid" gridTemplateColumns="100px 1fr" sx={{ '&:not(:last-child)': { marginBottom: SPACING.xxs } }}>
                      <Text color="SECONDARY" size="sm">{t(`branch.days.${day}`)}:</Text>
                      <Text color="SECONDARY" size="sm" weight="medium">{hours.open} - {hours.close}</Text>
                    </Box>);
                  })}
                </Box>
              </Box>
            </Box>

            {branch.updatedAt && (
              <Box display="flex" gap="md" alignItems="flex-start">
                <Icon color="PRIMARY"><Calendar /></Icon>
                <Box>
                  <Text weight="semibold">{t('branch.detail_last_updated_label')}</Text>
                  <Text color="SECONDARY">{new Date(branch.updatedAt).toLocaleString()}</Text>
                </Box>
              </Box>
            )}
          </Box>
        </Card>
      )}

      {activeTab === 'classes' && (
        <Box display="flex" flexDirection="column" gap="md">
          <Box display="flex" justifyContent="flex-end">
            <Button 
              leftIcon={<Icon><Plus /></Icon>} 
              onClick={() => setIsCreateClassModalOpen(true)}
              size="sm"
            >
              Add Class
            </Button>
          </Box>

          {isLoadingClasses ? (
            <Text>{t('common.loading')}</Text>
          ) : classes.length === 0 ? (
            <Box p="xl" textAlign="center" bg="NEUTRAL_LIGHT" borderRadius="md">
              <Icon size="lg" color="SECONDARY"><BookOpen /></Icon>
              <Text color="SECONDARY">No classes found for this branch.</Text>
            </Box>
          ) : (
            classes.map(cls => (
              <Card key={cls.id}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text weight="bold" size="lg">{cls.name}</Text>
                    <Text color="SECONDARY" size="sm">{cls.code}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Box 
                      px="sm" py="xxs" 
                      bg={cls.status === ClassStatus.ACTIVE ? 'SUCCESS_LIGHT' : 'NEUTRAL_LIGHT'} 
                      borderRadius="sm" 
                      display="inline-block"
                      mb="xs"
                    >
                      <Text size="xs" weight="bold" color={cls.status === ClassStatus.ACTIVE ? 'SUCCESS_DARK' : 'TEXT_SECONDARY'}>{cls.status.toUpperCase()}</Text>
                    </Box>
                    <Text size="sm" color="SECONDARY">{cls.currentStudents} / {cls.maxStudents} Students</Text>
                  </Box>
                </Box>
              </Card>
            ))
          )}
        </Box>
      )}

      {activeTab === 'students' && (
        <Box p="xl" textAlign="center" bg="NEUTRAL_LIGHT" borderRadius="md">
          <Box display="flex" justifyContent="flex-end" mb="md">
            <Button 
              leftIcon={<Icon><Plus /></Icon>} 
              onClick={() => setIsCreateStudentModalOpen(true)}
              size="sm"
            >
              Add Student
            </Button>
          </Box>
          {isLoadingStudents ? (
            <Text>{t('common.loading')}</Text>
          ) : students.length === 0 ? (
            <Box>
              <Icon size="lg" color="SECONDARY"><GraduationCap /></Icon>
              <Text color="SECONDARY">No students found for this branch.</Text>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap="md">
              {students
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map(student => (
                  <Card key={student.id}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box textAlign="left">
                        <Text weight="bold" size="lg">{student.name}</Text>
                        <Text color="SECONDARY" size="sm">{student.email}</Text>
                        {student.phone && <Text color="SECONDARY" size="sm">{student.phone}</Text>}
                      </Box>
                      <Box textAlign="right">
                        <Box px="sm" py="xxs" bg={student.status === 'active' ? 'SUCCESS_LIGHT' : 'NEUTRAL_LIGHT'} borderRadius="sm" display="inline-block" mb="xs">
                          <Text size="xs" weight="bold" color={student.status === 'active' ? 'SUCCESS_DARK' : 'TEXT_SECONDARY'}>
                            {student.status.toUpperCase()}
                          </Text>
                        </Box>
                        <Text size="sm" color="SECONDARY">Joined: {student.joinedDate.toLocaleDateString()}</Text>
                      </Box>
                    </Box>
                  </Card>
                ))}
              
              {Math.ceil(students.length / ITEMS_PER_PAGE) > 1 && (
                <Box mt="md" display="flex" justifyContent="center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(students.length / ITEMS_PER_PAGE)}
                    onPageChange={setCurrentPage}
                    siblingCount={1}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}

      {/* Simple Modal for Create Class */}
      {isCreateClassModalOpen && (
        <Box 
          position="fixed" top="0" left="0" right="0" bottom="0" 
          bg="rgba(0,0,0,0.5)" 
          display="flex" alignItems="center" justifyContent="center" 
          zIndex={1000}
        >
          <Card sx={{ width: '100%', maxWidth: '500px', margin: SPACING.md }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
              <Text variant="heading-md" weight="bold">Create New Class</Text>
              <Button variant="ghost" size="sm" onClick={() => setIsCreateClassModalOpen(false)}>
                <Icon><X /></Icon>
              </Button>
            </Box>
            
            <form onSubmit={handleCreateClass}>
              <Box display="flex" flexDirection="column" gap="md">
                <Input 
                  label="Class Name" 
                  placeholder="e.g. English K1"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  required
                />
                <Input 
                  label="Class Code" 
                  placeholder="e.g. ENG-K1"
                  value={newClassCode}
                  onChange={(e) => setNewClassCode(e.target.value)}
                  required
                />
                <Input 
                  label="Max Students" 
                  type="number"
                  value={newClassMaxStudents}
                  onChange={(e) => setNewClassMaxStudents(Number(e.target.value))}
                  required
                />
                
                <Box display="flex" justifyContent="flex-end" gap="sm" mt="md">
                  <Button variant="ghost" onClick={() => setIsCreateClassModalOpen(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isCreatingClass}>
                    Create Class
                  </Button>
                </Box>
              </Box>
            </form>
          </Card>
        </Box>
      )}

      {/* Simple Modal for Create Student */}
      {isCreateStudentModalOpen && (
        <Box 
          position="fixed" top="0" left="0" right="0" bottom="0" 
          bg="rgba(0,0,0,0.5)" 
          display="flex" alignItems="center" justifyContent="center" 
          zIndex={1000}
        >
          <Card sx={{ width: '100%', maxWidth: '500px', margin: SPACING.md }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
              <Text variant="heading-md" weight="bold">Add New Student</Text>
              <Button variant="ghost" size="sm" onClick={() => setIsCreateStudentModalOpen(false)}>
                <Icon><X /></Icon>
              </Button>
            </Box>
            
            <form onSubmit={handleCreateStudent}>
              <Box display="flex" flexDirection="column" gap="md">
                <Input 
                  label="Full Name" 
                  placeholder="e.g. Nguyen Van A"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  required
                />
                <Input 
                  label="Email" 
                  type="email"
                  placeholder="e.g. student@example.com"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  required
                />
                
                <Box display="flex" justifyContent="flex-end" gap="sm" mt="md">
                  <Button variant="ghost" onClick={() => setIsCreateStudentModalOpen(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isCreatingStudent}>
                    Add Student
                  </Button>
                </Box>
              </Box>
            </form>
          </Card>
        </Box>
      )}
    </Box>
  );
};