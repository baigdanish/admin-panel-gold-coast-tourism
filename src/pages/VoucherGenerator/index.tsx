import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import {
  QrCode2,
  ContentCopy,
  Download,
  Send,
  Delete,
  Add,
  Percent,
  AttachMoney,
  CalendarToday,
  Person,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Voucher {
  id: number;
  code: string;
  type: "percentage" | "fixed" | "package";
  value: number;
  used: number;
  maxUses: number;
  expiryDate: string;
  status: "active" | "expired" | "used";
}

const VoucherGenerator: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: 1,
      code: "WELCOME25",
      type: "percentage",
      value: 25,
      used: 45,
      maxUses: 100,
      expiryDate: "2024-04-30",
      status: "active",
    },
    {
      id: 2,
      code: "SUMMER100",
      type: "fixed",
      value: 100,
      used: 28,
      maxUses: 50,
      expiryDate: "2024-06-30",
      status: "active",
    },
    {
      id: 3,
      code: "VIP500",
      type: "fixed",
      value: 500,
      used: 15,
      maxUses: 20,
      expiryDate: "2024-05-15",
      status: "active",
    },
    {
      id: 4,
      code: "EASTER30",
      type: "percentage",
      value: 30,
      used: 65,
      maxUses: 100,
      expiryDate: "2024-04-10",
      status: "expired",
    },
  ]);

  const [openCreate, setOpenCreate] = useState(false);
  const [voucherType, setVoucherType] = useState("percentage");
  const [voucherValue, setVoucherValue] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const voucherData = [
    { month: "Jan", generated: 45, used: 32 },
    { month: "Feb", generated: 52, used: 45 },
    { month: "Mar", generated: 68, used: 58 },
    { month: "Apr", generated: 72, used: 65 },
    { month: "May", generated: 65, used: 52 },
    { month: "Jun", generated: 48, used: 42 },
  ];

  const handleCreateVoucher = () => {
    const newVoucher: Voucher = {
      id: vouchers.length + 1,
      code: voucherCode,
      type: voucherType as "percentage" | "fixed" | "package",
      value: parseFloat(voucherValue),
      used: 0,
      maxUses: parseInt(maxUses) || 100,
      expiryDate: expiryDate || "2024-12-31",
      status: "active",
    };
    setVouchers([...vouchers, newVoucher]);
    setOpenCreate(false);
    resetForm();
  };

  const resetForm = () => {
    setVoucherType("percentage");
    setVoucherValue("");
    setVoucherCode("");
    setMaxUses("");
    setExpiryDate("");
  };

  const getVoucherColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "#4CAF50";
      case "fixed":
        return "#2196F3";
      case "package":
        return "#FF9800";
      default:
        return "#9E9E9E";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a snackbar notification here
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6" fontWeight="bold">
          Voucher & Ticket Generation
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreate(true)}
        >
          Generate Voucher
        </Button>
      </Box>

      {/* Stats and Generator */}
      {/* Stats and Generator */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
        {/* Chart */}
        <Box flex="1 1 420px">
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Voucher Usage Trend
            </Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={voucherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="generated"
                    name="Generated"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="used"
                    name="Used"
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>

        {/* Quick Generate */}
        <Box flex="1 1 300px">
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="subtitle2" gutterBottom>
              Quick Generate
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={voucherType}
                  label="Type"
                  onChange={(e) => setVoucherType(e.target.value)}
                >
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed Amount</MenuItem>
                  <MenuItem value="package">Package Deal</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Value"
                size="small"
                value={voucherValue}
                onChange={(e) => setVoucherValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {voucherType === "percentage" ? (
                        <Percent />
                      ) : (
                        <AttachMoney />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Code (Optional)"
                size="small"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={handleCreateVoucher}
                fullWidth
              >
                Generate Now
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>

      {/* Active Vouchers */}
      <Typography variant="subtitle2" gutterBottom>
        Active Vouchers
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Voucher Code</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Usage</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow key={voucher.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography fontWeight="bold">{voucher.code}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(voucher.code)}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={voucher.type}
                    size="small"
                    sx={{
                      bgcolor: `${getVoucherColor(voucher.type)}20`,
                      color: getVoucherColor(voucher.type),
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">
                    {voucher.type === "percentage"
                      ? `${voucher.value}%`
                      : `$${voucher.value}`}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <Typography variant="body2">
                      {voucher.used} / {voucher.maxUses}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(voucher.used / voucher.maxUses) * 100}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: "#E0E0E0",
                        "& .MuiLinearProgress-bar": {
                          bgcolor:
                            voucher.status === "expired"
                              ? "#F44336"
                              : voucher.used / voucher.maxUses > 0.8
                              ? "#FF9800"
                              : "#4CAF50",
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={<CalendarToday sx={{ fontSize: 14 }} />}
                    label={voucher.expiryDate}
                    size="small"
                    color={voucher.status === "expired" ? "error" : "default"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton size="small">
                      <QrCode2 fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Download fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Send fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Ticket Preview */}
      {/* Ticket Preview */}
      <Box mt={3}>
        <Paper sx={{ p: 3, bgcolor: "#1a237e", color: "white" }}>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flex="1 1 300px">
              <Typography variant="h6" gutterBottom>
                Travel Booking Ticket
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <Person sx={{ verticalAlign: "middle", mr: 1 }} />
                  Customer: John Doe
                </Typography>
                <Typography variant="body2">
                  <CalendarToday sx={{ verticalAlign: "middle", mr: 1 }} />
                  Tour: European Adventure • Date: 2024-04-15
                </Typography>
                <Chip
                  label="CONFIRMED"
                  size="small"
                  sx={{
                    bgcolor: "#4CAF50",
                    color: "white",
                    width: "fit-content",
                  }}
                />
              </Stack>
            </Box>

            <Box textAlign="center">
              <Box sx={{ bgcolor: "white", p: 1, display: "inline-block" }}>
                <QrCode2 sx={{ fontSize: 80, color: "#1a237e" }} />
              </Box>
              <Typography variant="caption" display="block">
                Scan to verify
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Create Voucher Dialog */}
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate New Voucher</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Voucher Type</InputLabel>
              <Select
                value={voucherType}
                label="Voucher Type"
                onChange={(e) => setVoucherType(e.target.value)}
              >
                <MenuItem value="percentage">Percentage Discount</MenuItem>
                <MenuItem value="fixed">Fixed Amount</MenuItem>
                <MenuItem value="package">Tour Package</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Discount Value"
              value={voucherValue}
              onChange={(e) => setVoucherValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {voucherType === "percentage" ? (
                      <Percent />
                    ) : (
                      <AttachMoney />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Custom Code (Optional)"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Leave blank for auto-generate"
            />

            <TextField
              label="Maximum Uses"
              type="number"
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
            />

            <TextField
              label="Expiry Date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateVoucher}>
            Generate Voucher
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default VoucherGenerator;
