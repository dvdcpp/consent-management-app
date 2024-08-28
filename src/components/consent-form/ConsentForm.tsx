import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Checkbox, Button, FormControlLabel, Grid, Typography, Paper, CircularProgress, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { consentsService } from "@/services/mockConsentService";
import { ConsentData } from "@/types/consents";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  permissions: yup
    .object()
    .shape({
      receiveNewsletter: yup.boolean().required(),
      showTargetedAds: yup.boolean().required(),
      contributeToStatistics: yup.boolean().required(),
    })
    .test("atLeastOne", "At least one consent option must be selected", (permissions) => {
      return permissions.receiveNewsletter || permissions.showTargetedAds || permissions.contributeToStatistics;
    }),
});

const ConsentForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    trigger,
  } = useForm<ConsentData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      permissions: {
        receiveNewsletter: false,
        showTargetedAds: false,
        contributeToStatistics: false,
      },
    },
  });

  const permissions = useWatch({
    control,
    name: "permissions",
  });

  useEffect(() => {
    trigger("permissions");
  }, [permissions, trigger]);

  const onSubmit = async (data: ConsentData) => {
    try {
      await consentsService.addConsent(data);
      navigate("/consents");
    } catch (error) {
      console.error("Error submitting consent:", error);
      setError("Failed to submit consent. Please try again.");
    }
  };

  return (
    <Paper>
      <Box padding={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField {...field} fullWidth label="Name" error={!!errors.name} helperText={errors.name?.message} inputProps={{ "aria-label": "Name" }} />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Email address" type="email" error={!!errors.email} helperText={errors.email?.message} inputProps={{ "aria-label": "Email address" }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">I agree to:</Typography>
              <Controller name="permissions.receiveNewsletter" control={control} render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Receive newsletter" />} />
              <Controller name="permissions.showTargetedAds" control={control} render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Be shown targeted ads" />} />
              <Controller
                name="permissions.contributeToStatistics"
                control={control}
                render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Contribute to anonymous visit statistics" />}
              />
              {errors.permissions && touchedFields.permissions && (
                <Typography color="error" variant="caption" display="block">
                  {errors.permissions.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || !isValid} aria-label="Submit consent form">
                Give consent
                {isSubmitting && <CircularProgress size={16} sx={{ marginLeft: 1 }} />}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ConsentForm;
