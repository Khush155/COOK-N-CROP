import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography, Alert, Table, TableBody, TableCell, Box, Pagination, TableHead, TableRow, Paper, Tooltip, Chip, Button, Select, MenuItem, IconButton, Container, Stack,
  TextField, FormControl, InputLabel, useTheme, alpha, Menu, ListItemIcon, ListItemText, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link as RouterLink } from 'react-router-dom';
import adminService from '../../services/adminService';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from '../../custom_components/Loader';
import { getAvatarUrl } from '../../utils/imageHelpers';

const ManageOrders = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingStatus, setUpdatingStatus] = useState(null); // Tracks which order is being updated
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusColors = {
    Pending: 'warning',
    Processing: 'info',
    Shipped: 'primary',
    Delivered: 'success',
    Canceled: 'error',
  };

  // Status order for timeline display
  const statusOrder = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // Reset page to 1 when search term changes
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllOrders({ page, search: debouncedSearchTerm, status: statusFilter });
      setOrders(data.orders);
      setPage(data.page);
      setTotalPages(data.pages);
    } catch (err) {
      setError('Failed to fetch orders.');
      setOrders([]); // Clear orders on error
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchTerm, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    try {
      const updatedOrder = await adminService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o._id === orderId ? updatedOrder : o));
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleActionsClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleActionsClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  return (
    <Container maxWidth="xl" disableGutters sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Hero Header Banner */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2.5, sm: 3.5 }, 
          mb: 4, 
          borderRadius: 4, 
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.background.paper, 0.95)})`,
          backdropFilter: 'blur(16px)',
          boxShadow: `0 8px 32px -4px ${alpha(theme.palette.primary.main, 0.1)}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.15), color: 'primary.main', width: 44, height: 44 }}>
              <ReceiptLongIcon />
            </Avatar>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, fontFamily: theme.typography.fontFamily, fontSize: { xs: '1.5rem', sm: '1.85rem', md: '2.25rem' }, letterSpacing: '-0.02em' }}>
              Order Management
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.85rem', sm: '0.95rem' } }}>
            Inspect status timelines, manage customer orders, and update delivery states.
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to="/admin/orders/create"
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          sx={{
            borderRadius: 2.5,
            fontWeight: 700,
            textTransform: 'none',
            px: 2.5,
            py: 1,
            fontFamily: theme.typography.fontFamily,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
          }}
        >
          Create Order
        </Button>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.6)}`, boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.04)}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: { xs: 1, sm: 2 } }}>
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ flexGrow: 1, flexWrap: 'wrap', gap: { xs: 1, sm: 2 }, alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              label="Search by ID, User, or Email"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                minWidth: { xs: '100%', sm: 260 },
                '& .MuiOutlinedInput-root': { borderRadius: 3 }
              }}
              InputLabelProps={{ sx: { fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
              inputProps={{ sx: { fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, fontSize: { xs: 16, sm: 20 }, color: 'text.secondary' }} />,
              }}
            />
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 } }}>
              <InputLabel sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                label="Status Filter"
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                sx={{ 
                  borderRadius: 3, 
                  fontFamily: theme.typography.fontFamily,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
                IconComponent={FilterListIcon}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        fontFamily: theme.typography.fontFamily,
                        fontSize: { xs: '0.75rem', sm: '1rem' }
                      },
                    },
                  },
                }}
              >
                <MenuItem value="All" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>All Statuses</MenuItem>
                <MenuItem value="Pending" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Pending</MenuItem>
                <MenuItem value="Processing" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Processing</MenuItem>
                <MenuItem value="Shipped" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Shipped</MenuItem>
                <MenuItem value="Delivered" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Delivered</MenuItem>
                <MenuItem value="Canceled" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Canceled</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Button
            component={RouterLink}
            to="/admin/orders/create"
            variant="contained"
            startIcon={<AddShoppingCartIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
            sx={{ 
              fontFamily: theme.typography.fontFamily, 
              borderRadius: 2,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              py: { xs: 0.5, sm: 1 },
              px: { xs: 1, sm: 2 },
              width: { xs: '100%', sm: 'auto' },
              mt: { xs: 1, sm: 0 },
              height: { sm: 40 } // Fixed height for laptop view
            }}
          >
            Create Order
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}><Loader size="large" /></Box>
        ) : error ? (
          <Alert severity="error" sx={{ fontFamily: theme.typography.fontFamily, borderRadius: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>{error}</Alert>
        ) : (
          <>
            <Box sx={{ overflowX: 'auto', width: '100%' }}>
              <Table sx={{ minWidth: { xs: 600, sm: 800, md: 1000 } }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Payment</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Actions</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow 
                        key={order._id} 
                        hover 
                        sx={{ 
                          '& td': { py: { xs: 1, sm: 1.5 } },
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.02)
                          }
                        }}
                      >
                        <TableCell>
                          <Tooltip title={order._id}>
                            <Typography variant="body2" noWrap sx={{ maxWidth: { xs: 80, sm: 120 }, fontFamily: theme.typography.fontFamily, fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                              {order._id.substring(0, 8)}...
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                              src={getAvatarUrl(order.user)}
                              sx={{ 
                                width: { xs: 24, sm: 32 }, 
                                height: { xs: 24, sm: 32 }, 
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main',
                                fontWeight: 'bold',
                                fontSize: { xs: '0.625rem', sm: '0.75rem' }
                              }}
                            >
                              {order.user?.username?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                {order.user?.username || 'N/A'}
                              </Typography>
                              {order.user?.email && (
                                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.625rem', sm: '0.75rem' } }}>
                                  {order.user.email}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          <Typography variant="body2" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.625rem', sm: '0.75rem' } }}>
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          <Typography variant="body2" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            ₹{order.totalPrice.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.paymentMethod} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              borderRadius: 1, 
                              fontFamily: theme.typography.fontFamily,
                              fontSize: { xs: '0.625rem', sm: '0.75rem' }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status} 
                            color={statusColors[order.status] || 'default'} 
                            size="small" 
                            sx={{ 
                              borderRadius: 1, 
                              fontFamily: theme.typography.fontFamily,
                              fontSize: { xs: '0.625rem', sm: '0.75rem' }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FormControl size="small" sx={{ minWidth: { xs: 100, sm: 140 } }}>
                              <Select 
                                value={order.status} 
                                onChange={(e) => handleStatusChange(order._id, e.target.value)} 
                                size="small" 
                                disabled={updatingStatus === order._id}
                                sx={{ 
                                  borderRadius: 2, 
                                  fontFamily: theme.typography.fontFamily,
                                  '& .MuiSelect-select': { 
                                    py: { xs: 0.5, sm: 1 }, 
                                    px: { xs: 1, sm: 1.5 },
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                  } 
                                }}
                              >
                                <MenuItem value="Pending" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Pending</MenuItem>
                                <MenuItem value="Processing" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Processing</MenuItem>
                                <MenuItem value="Shipped" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Shipped</MenuItem>
                                <MenuItem value="Delivered" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Delivered</MenuItem>
                                <MenuItem value="Canceled" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.75rem', sm: '1rem' } }}>Canceled</MenuItem>
                              </Select>
                            </FormControl>
                            {updatingStatus === order._id && <Loader size="small" />}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={(event) => handleActionsClick(event, order)}
                            sx={{ 
                              border: `1px solid ${theme.palette.divider}`, 
                              borderRadius: 2,
                              width: { xs: 32, sm: 40 },
                              height: { xs: 32, sm: 40 }
                            }}
                          >
                            <MoreVertIcon fontSize="small" sx={{ fontSize: { xs: 16, sm: 20 } }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Box sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center' }}>
                          <ReceiptLongIcon sx={{ fontSize: { xs: 36, sm: 48 }, color: 'grey.400', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            No orders found
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            Try adjusting your search criteria
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                  siblingCount={1}
                  boundaryCount={1}
                  sx={{ 
                    '& .MuiPaginationItem-root': { 
                      borderRadius: 2,
                      fontFamily: theme.typography.fontFamily,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionsClose}
        sx={{ '& .MuiMenuItem-root': { fontFamily: theme.typography.fontFamily, fontSize: { xs: '0.875rem', sm: '1rem' } } }}
      >
        <MenuItem 
          component={RouterLink} 
          to={`/order/${selectedOrder?._id}`}
          onClick={handleActionsClose}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" sx={{ fontSize: { xs: 16, sm: 20 } }} />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem 
          component={RouterLink} 
          to={`/admin/orders/edit/${selectedOrder?._id}`}
          onClick={handleActionsClose}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ fontSize: { xs: 16, sm: 20 } }} />
          </ListItemIcon>
          <ListItemText>Edit Order</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default ManageOrders;