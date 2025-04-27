// components/Footer.jsx
import React from 'react';
import { 
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
  Divider
} from '@mui/material';
import {
  YouTube,
  Twitter,
  LinkedIn,
  Facebook,
  Instagram
} from '@mui/icons-material';

const Footer = ({ mode }) => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3,
        mt: 'auto',
        backgroundColor: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2}>
          {/* Social Links */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: 1
          }}>
            <IconButton 
              href="https://www.youtube.com/accenture" 
              target="_blank" 
              rel="noopener"
              aria-label="YouTube"
              size="small"
            >
              <YouTube sx={{ color: '#FF0000', fontSize: 24 }} />
            </IconButton>
            <IconButton 
              href="https://twitter.com/accenture" 
              target="_blank" 
              rel="noopener"
              aria-label="Twitter"
              size="small"
            >
              <Twitter sx={{ color: '#1DA1F2', fontSize: 24 }} />
            </IconButton>
            <IconButton 
              href="https://www.linkedin.com/company/accenture" 
              target="_blank" 
              rel="noopener"
              aria-label="LinkedIn"
              size="small"
            >
              <LinkedIn sx={{ color: '#0077B5', fontSize: 24 }} />
            </IconButton>
            <IconButton 
              href="https://www.facebook.com/accenture" 
              target="_blank" 
              rel="noopener"
              aria-label="Facebook"
              size="small"
            >
              <Facebook sx={{ color: '#1877F2', fontSize: 24 }} />
            </IconButton>
            <IconButton 
              href="https://www.instagram.com/accenture/" 
              target="_blank" 
              rel="noopener"
              aria-label="Instagram"
              size="small"
            >
              <Instagram sx={{ color: '#E4405F', fontSize: 24 }} />
            </IconButton>
          </Box>

          {/* Legal Links */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
            '& a': {
              fontSize: '1rem'
            }
          }}>
            <Link 
              href="https://www.accenture.com/us-en/careers" 
              target="_blank" 
              rel="noopener"
              color="text.secondary"
              underline="hover"
            >
              Careers
            </Link>
            <Link 
              href="https://www.accenture.com/us-en/privacy-policy" 
              target="_blank" 
              rel="noopener"
              color="text.secondary"
              underline="hover"
            >
              Privacy
            </Link>
            <Link 
              href="https://www.accenture.com/us-en/terms-conditions" 
              target="_blank" 
              rel="noopener"
              color="text.secondary"
              underline="hover"
            >
              Terms
            </Link>
          </Box>


          {/* Copyright and Cookie Notice */}
          <Stack direction="column" alignItems="center" spacing={0.5}>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              By using this site you agree to our use of cookies
            </Typography>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Accenture. All rights reserved.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;