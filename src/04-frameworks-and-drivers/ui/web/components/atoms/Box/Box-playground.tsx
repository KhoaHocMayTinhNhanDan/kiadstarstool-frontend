import { Box } from './Box';
import { COLORS } from '../00-core/tokens-constants';

export const BoxTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        📦 Box Component Demo
      </h2>

      <Box p="24px" bg={COLORS.NEUTRAL_LIGHT} style={{ borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Container Box</h3>
        <p>This box has padding and background color defined via props.</p>
        
        <Box mt="16px" display="flex" style={{ gap: '12px' }}>
          <Box p="12px" bg={COLORS.PRIMARY} color="white" style={{ borderRadius: '4px' }}>
            Box 1
          </Box>
          <Box p="12px" bg={COLORS.SUCCESS} color="white" style={{ borderRadius: '4px' }}>
            Box 2
          </Box>
          <Box p="12px" bg={COLORS.DANGER} color="white" style={{ borderRadius: '4px' }}>
            Box 3
          </Box>
        </Box>
      </Box>

      {/* Real-world Examples */}
      <Box mt="40px">
        <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples: Card Layout</h3>
        <Box 
          p="24px" 
          bg="white" 
          style={{ 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            maxWidth: '350px',
            border: '1px solid #e2e8f0'
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="16px">
            <span style={{ fontWeight: 600, color: '#2d3748' }}>Total Revenue</span>
            <span style={{ fontSize: '12px', color: '#718096' }}>Last 30 days</span>
          </Box>
          
          <Box mb="24px">
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#1a202c' }}>$45,231.89</span>
            <span style={{ marginLeft: '8px', fontSize: '14px', color: '#48bb78', fontWeight: 500 }}>+20.1%</span>
          </Box>

          <Box display="flex" gap="12px">
             <Box flex="1" h="8px" bg="#edf2f7" style={{ borderRadius: '4px', overflow: 'hidden' }}>
               <Box w="70%" h="100%" bg={COLORS.PRIMARY} />
             </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};